export type WorkspaceFilters = {
    name: string | null,
    use_for: string | null
}

export type Workspace = {
    user_id: number,
} & WorkspaceFilters

export type WorkspaceIdentity = {
    workspace_id: string,
    user_id: number
}
