import { z } from "zod";

export type WSActions =
  | "Create"
  | "Lorem"
  | "Lorem2"
  | "Lorem3"
  | "Lorem4"
  | "Lorem5"
  | "Lorem6";

export const WSActionsBis = {
  var: "Create",
  var1: "Lorem",
  var2: "Lorem2",
  var3: "Lorem3",
  var4: "Lorem4",
  var5: "Lorem5",
  var6: "Lorem6",
} as const;

export type WSInputData = {
  action: string;
  data: {
    id: string;
    color: number;
  };
};

export const WSInputSchema = z.object({
  action: z.nativeEnum(WSActionsBis),
  data: z.object({
    id: z.string(),
    color: z.string().optional(),
  }),
});

export type WSInputDataSchema = z.infer<typeof WSInputSchema>;
