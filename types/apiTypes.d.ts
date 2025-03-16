type RegisterActionResult =
    | { success: true; message: string }
    | { success: false; error: string };

type LoginActionResult =
    | { success: true; message: string }
    | { success: false; error: string };