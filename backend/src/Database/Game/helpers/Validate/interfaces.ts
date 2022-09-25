export interface IIsValid {
  right: boolean
  left: boolean
  up: boolean
  down: boolean
  upRight: boolean
  upLeft: boolean
  downRight: boolean
  downLeft: boolean
}

export interface ICounters {
  right: number
  left: number
  up: number
  down: number
  upRight: number
  upLeft: number
  downRight: number
  downLeft: number
}

export interface IValidations {
  right: (i: number) => boolean
  left: (i: number) => boolean
  up: (i: number) => boolean
  down: (i: number) => boolean
  upRight: (i: number) => boolean
  upLeft: (i: number) => boolean
  downRight: (i: number) => boolean
  downLeft: (i: number) => boolean
}

export interface ICheckValue {
  right: (i: number) => boolean
  left: (i: number) => boolean
  up: (i: number) => boolean
  down: (i: number) => boolean
  upRight: (i: number) => boolean
  upLeft: (i: number) => boolean
  downRight: (i: number) => boolean
  downLeft: (i: number) => boolean

}
