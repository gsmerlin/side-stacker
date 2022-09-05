export interface IsValid {
  right: boolean
  left: boolean
  up: boolean
  down: boolean
  upRight: boolean
  upLeft: boolean
  downRight: boolean
  downLeft: boolean
}

export interface Counters {
  right: number
  left: number
  up: number
  down: number
  upRight: number
  upLeft: number
  downRight: number
  downLeft: number
}

export interface Validations {
  right: (i: number) => boolean
  left: (i: number) => boolean
  up: (i: number) => boolean
  down: (i: number) => boolean
  upRight: (i: number) => boolean
  upLeft: (i: number) => boolean
  downRight: (i: number) => boolean
  downLeft: (i: number) => boolean
}

export interface CheckValue {
  right: (i: number) => boolean
  left: (i: number) => boolean
  up: (i: number) => boolean
  down: (i: number) => boolean
  upRight: (i: number) => boolean
  upLeft: (i: number) => boolean
  downRight: (i: number) => boolean
  downLeft: (i: number) => boolean

}
