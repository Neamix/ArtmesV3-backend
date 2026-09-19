import z from "zod";

export const workspaceSchema = z.object({
    name: z
    .string({error: "Enter your workspace name"})
    .min(3)
    .max(100),

    use_for: z
    .string({error: "What you will use the workspace for"})
    .min(3)
    .max(1000)
});


export const workspaceUpdateSchema = z.object({
    workspace_id: z
    .string({error: "Specify the workspace id"}),

    name: z
    .string({error: "Enter your workspace name"})
    .min(3)
    .max(100),

    use_for: z
    .string({error: "What you will use the workspace for"})
    .min(3)
    .max(1000)
})

export type WorkspaceInput = z.infer<typeof workspaceSchema>;
export type WorkspaceUpdate = z.infer<typeof workspaceUpdateSchema>;