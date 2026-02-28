import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { createClient, RedisClientType } from "redis";
import { config } from "src/utils";

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
    private client!: RedisClientType;
    constructor() {}

    async onModuleInit() {
        this.client = createClient({
            socket: {
                host: config.REDIS_HOST,
                port: config.REDIS_PORT,
                tls: true,
            },
            username: config.REDIS_USERNAME,
            password: config.REDIS_PASSWORD,
        });

        try {
            await this.client.connect();
            console.log('Redis connected successfully');
        } catch (error) {
            console.error('Redis connection failed', error);
            throw error;
        }
    }

    private getClient(): RedisClientType {
        if (!this.client) {
            throw new Error("Redis client is not initialized");
        }

        return this.client;
    }

    // -------------------------------------------------------------------------
    // Key-Value (string) operations
    // -------------------------------------------------------------------------

    async set<T = string>(
        key: string,
        value: T,
        ttlSeconds?: number,
    ): Promise<void> {
        const client = this.getClient();
        const stringValue =
            typeof value === "string" ? value : JSON.stringify(value);

        if (ttlSeconds && ttlSeconds > 0) {
            await client.set(key, stringValue, { EX: ttlSeconds });
        } else {
            await client.set(key, stringValue);
        }
    }

    async get<T = string>(key: string): Promise<T | null> {
        const client = this.getClient();
        const result = await client.get(key);

        if (result === null) return null;

        try {
            return JSON.parse(result) as T;
        } catch {
            return result as unknown as T;
        }
    }

    async delete(key: string | string[]): Promise<number> {
        const client = this.getClient();
        return client.del(key as any);
    }

    async exists(key: string | string[]): Promise<number> {
        const client = this.getClient();
        return client.exists(key as any);
    }

    async expire(key: string, ttlSeconds: number): Promise<boolean> {
        const client = this.getClient();
        const result = await client.expire(key, ttlSeconds);
        return result === 1;
    }

    async ttl(key: string): Promise<number> {
        const client = this.getClient();
        return client.ttl(key);
    }

    async increment(key: string, amount = 1): Promise<number> {
        const client = this.getClient();
        return client.incrBy(key, amount);
    }

    // -------------------------------------------------------------------------
    // Hash operations
    // -------------------------------------------------------------------------

    async hSet(
        key: string,
        field: string,
        value: string | number | boolean | object,
    ): Promise<number> {
        const client = this.getClient();
        const stringValue =
            typeof value === "string" ? value : JSON.stringify(value);
        return client.hSet(key, field, stringValue);
    }

    async hSetMany(
        key: string,
        values: Record<string, string | number | boolean | object>,
    ): Promise<number> {
        const client = this.getClient();
        const serialized: Record<string, string> = {};

        for (const [field, value] of Object.entries(values)) {
            serialized[field] =
                typeof value === "string" ? value : JSON.stringify(value);
        }

        return client.hSet(key, serialized);
    }

    async hGet<T = string>(key: string, field: string): Promise<T | null> {
        const client = this.getClient();
        const result = await client.hGet(key, field);

        if (result === null) return null;

        try {
            return JSON.parse(result) as T;
        } catch {
            return result as unknown as T;
        }
    }

    async hGetAll(
        key: string,
    ): Promise<Record<string, string> | Record<string, unknown>> {
        const client = this.getClient();
        const result = await client.hGetAll(key);

        // Try to JSON-parse each value, but gracefully fall back to raw string
        const parsed: Record<string, unknown> = {};
        for (const [field, value] of Object.entries(result)) {
            try {
                parsed[field] = JSON.parse(value);
            } catch {
                parsed[field] = value;
            }
        }

        return parsed;
    }

    async hDel(key: string, fields: string | string[]): Promise<number> {
        const client = this.getClient();
        const fieldArray = Array.isArray(fields) ? fields : [fields];
        return client.hDel(key, fieldArray);
    }

    // -------------------------------------------------------------------------
    // List operations
    // -------------------------------------------------------------------------

    async lPush(
        key: string,
        ...values: (string | number | boolean | object)[]
    ): Promise<number> {
        const client = this.getClient();
        const serialized = values.map((v) =>
            typeof v === "string" ? v : JSON.stringify(v),
        );
        return client.lPush(key, serialized);
    }

    async rPush(
        key: string,
        ...values: (string | number | boolean | object)[]
    ): Promise<number> {
        const client = this.getClient();
        const serialized = values.map((v) =>
            typeof v === "string" ? v : JSON.stringify(v),
        );
        return client.rPush(key, serialized);
    }

    async lPop<T = string>(key: string): Promise<T | null> {
        const client = this.getClient();
        const result = await client.lPop(key);

        if (result === null) return null;

        try {
            return JSON.parse(result) as T;
        } catch {
            return result as unknown as T;
        }
    }

    async rPop<T = string>(key: string): Promise<T | null> {
        const client = this.getClient();
        const result = await client.rPop(key);

        if (result === null) return null;

        try {
            return JSON.parse(result) as T;
        } catch {
            return result as unknown as T;
        }
    }

    async lRange<T = string>(
        key: string,
        start = 0,
        stop = -1,
    ): Promise<T[]> {
        const client = this.getClient();
        const results = await client.lRange(key, start, stop);

        return results.map((item) => {
            try {
                return JSON.parse(item) as T;
            } catch {
                return item as unknown as T;
            }
        });
    }

    // -------------------------------------------------------------------------
    // Set operations
    // -------------------------------------------------------------------------

    async sAdd(
        key: string,
        ...members: (string | number | boolean | object)[]
    ): Promise<number> {
        const client = this.getClient();
        const serialized = members.map((v) =>
            typeof v === "string" ? v : JSON.stringify(v),
        );
        return client.sAdd(key, serialized);
    }

    async sRem(
        key: string,
        ...members: (string | number | boolean | object)[]
    ): Promise<number> {
        const client = this.getClient();
        const serialized = members.map((v) =>
            typeof v === "string" ? v : JSON.stringify(v),
        );
        return client.sRem(key, serialized);
    }

    async sMembers<T = string>(key: string): Promise<T[]> {
        const client = this.getClient();
        const members = await client.sMembers(key);

        return members.map((item) => {
            try {
                return JSON.parse(item) as T;
            } catch {
                return item as unknown as T;
            }
        });
    }

    async sIsMember(
        key: string,
        member: string | number | boolean | object,
    ): Promise<boolean> {
        const client = this.getClient();
        const serialized =
            typeof member === "string" ? member : JSON.stringify(member);
        const result = await client.sIsMember(key, serialized);
        return result === 1;
    }

    // -------------------------------------------------------------------------
    // Utility operations
    // -------------------------------------------------------------------------

    async flushDb(): Promise<void> {
        const client = this.getClient();
        await client.flushDb();
    }

    async onModuleDestroy() {
        try {
            await this.client.destroy();
            console.log('Redis disconnected successfully');
        } catch (error) {
            console.error('Redis disconnection failed', error);
            throw error;
        }
    }
}