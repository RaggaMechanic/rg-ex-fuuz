import { Color, vec } from "excalibur";
import { PlayerArgs } from "./player.interfaces";

export const DEFAULT_PLAYER_ARGS: PlayerArgs = {health: 300, velocity: 150}

export const PLAYER_START_POSITION = vec(150, 150)
export const DEFAULT_PLAYER_WIDTH = 25
export const DEFAULT_PLAYER_HEIGHT = 25
export const DEFAULT_PLAYER_COLOR = new Color(255, 255, 255)

export const PLAYER_ANIMATION_SPEED = 100
export const PLAYER_DEATH_ROTATION = 30
export const PLAYER_COLOR = Color.Gray