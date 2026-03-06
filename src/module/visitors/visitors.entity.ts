import { BaseEntity } from 'src/core';
import { Column, Entity } from 'typeorm';

export enum DeviceType {
    MOBILE = 'mobile',
    TABLET = 'tablet',
    DESKTOP = 'desktop',
    SMARTTV = 'smarttv',
    WEARABLE = 'wearable',
    EMBEDDED = 'embedded',
    BOT = 'bot',
    UNKNOWN = 'unknown'
}

export enum CpuArchitecture {
    ARM = 'arm',
    ARM64 = 'arm64',
    X86 = 'x86',
    X64 = 'x64',
    MIPS = 'mips',
    PPC = 'ppc',
    UNKNOWN = 'unknown'
}

export enum EngineName {
    BLINK = 'blink',
    WEBKIT = 'webkit',
    GECKO = 'gecko',
    TRIDENT = 'trident',
    EDGEHTML = 'edgehtml',
    UNKNOWN = 'unknown'
}

export enum BrowserName {
    CHROME = 'chrome',
    FIREFOX = 'firefox',
    SAFARI = 'safari',
    EDGE = 'edge',
    OPERA = 'opera',
    BRAVE = 'brave',
    VIVALDI = 'vivaldi',
    SAMSUNG_INTERNET = 'samsung_internet',
    UC_BROWSER = 'uc_browser',
    INTERNET_EXPLORER = 'ie',
    UNKNOWN = 'unknown'
}

export enum OsName {
    ANDROID = 'android',
    IOS = 'ios',
    WINDOWS = 'windows',
    MACOS = 'macos',
    LINUX = 'linux',
    CHROME_OS = 'chrome_os',
    UNKNOWN = 'unknown'
}

@Entity()
export class Visitor extends BaseEntity {
    @Column({ default: 0 })
    visitCount: number;

    @Column()
    deviceId: string;

    @Column({ unique: true })
    sessionId: string;

    @Column({ nullable: true })
    ipAddress: string;

    @Column({ nullable: true })
    deviceModel: string;

    @Column({ nullable: true })
    deviceVendor: string;

    @Column({
        type: "enum",
        enum: DeviceType,
        default: DeviceType.UNKNOWN
    })
    deviceType: DeviceType;

    @Column({
        type: "enum",
        enum: BrowserName,
        default: BrowserName.UNKNOWN
    })
    browserName: BrowserName;

    @Column({ nullable: true })
    browserVersion: string;

    @Column({
        type: "enum",
        enum: OsName,
        default: OsName.UNKNOWN
    })
    osName: OsName;

    @Column({ nullable: true })
    osVersion: string;

    @Column({
        type: "enum",
        enum: EngineName,
        default: EngineName.UNKNOWN
    })
    engineName: EngineName;

    @Column({ nullable: true })
    engineVersion: string;

    @Column({
        type: "enum",
        enum: CpuArchitecture,
        default: CpuArchitecture.UNKNOWN
    })
    cpuArchitecture: CpuArchitecture;
}