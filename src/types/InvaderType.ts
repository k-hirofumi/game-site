export type MoveObj = {
    x: number;
    y: number;
}

export type PlayerObj = MoveObj & {
    life: number;
}

export type PlayerAttackObj = MoveObj

export type InvaderObj = MoveObj & {
    image: any;
    died: boolean;
}

export type InvaderAttackObj = MoveObj & {
    image: any;
}