type ServerActionResult<D, E> = (
  D extends void ? { success: true } : { success: true, data: D }
) | (
  E extends void ? { success: false } : { success: false, error: E }
)

export type { ServerActionResult }
