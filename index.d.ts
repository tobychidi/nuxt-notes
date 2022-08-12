import { User } from "@prisma/client";

declare type AuthPayload = Pick<User, 'id' | 'email' | 'username'>

declare type ButtonType = "primary" | "secondary"

declare type ButtonSize = "small" | "large"