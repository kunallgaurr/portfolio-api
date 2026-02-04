import z from "zod";

export const getWeatherSchema = z.object({
    latitude: z.string(),
    longitude: z.string()
});

export type GetWeatherSchemaType = z.infer<typeof getWeatherSchema>;