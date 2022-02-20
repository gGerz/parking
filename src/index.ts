
type CarBrand = 'KIA' | 'УАЗ' | 'TOYOTA' | 'MAZDA' | 'PORCHES'
type CarType = 'light' | 'hard'   // легковой / грузовой
type CarSize = 1 | 2              // сколько места занимает

interface ICar {
    id: string
    color: string,
    brand: CarBrand,
    size?: CarSize
    type?: CarType,
}
interface ICarClass extends ICar {
    driveTo: (parking: Parking) => void
    driveOut: (parking: Parking) => void
}

interface IParking {
    cars: Array<ICar>
    maxPlaceCounter: number
}

interface IParkingClass extends IParking {
    cars: Array<ICar>
    maxPlaceCounter: number
    driveTo: (car: Car) => void
    driveOut: (car: Car) => void
    findAndPrintCarInfo (id: string): void
}

class Parking implements IParkingClass {
    cars: Array<ICar>
    maxPlaceCounter: number
    currentFreePlacesCounter: number

    constructor(parking: IParking) {
        this.cars = parking.cars
        this.maxPlaceCounter = parking.maxPlaceCounter
        const parkedCardCounter = parking.cars.length
        this.currentFreePlacesCounter = parking.maxPlaceCounter - parkedCardCounter
    }

    driveTo (car: Car) {
        this.cars.push(car)
        this.currentFreePlacesCounter -= car.size
        console.log(`На парковку вьехала машина с номером: ${car.id}, Осталось мест: ${this.currentFreePlacesCounter}`)
    }

    driveOut (car: Car) {
        const findCarIndex = this.cars.findIndex((item) => item.id === car.id)
        this.cars.splice(findCarIndex, 1)
        this.currentFreePlacesCounter += car.size
        console.log(`C парковки выехала машина с номером: ${car.id}, Осталось мест: ${this.currentFreePlacesCounter}`)
    }

    /**
     * @description - найти машину по гос номеру
     * @param id
     */
    findAndPrintCarInfo (id: string): void {
        const findingCar = this.cars.find((car) => car.id === id)
        if (findingCar) {
            return console.log(`Вот, что удалось найти: ${findingCar}`)
        } else {
            console.log(`Автомобиль с Гос Номером ${id} не найден, поищите на другой парковке`)
        }
    }

    printStaticByParam(paramName: keyof ICar, paramValue: string): void {
        const counter = this.cars.filter((car) => car[paramName] === paramValue)
        console.log(`На парковке находится ${counter.length} автомоб(илей/иль/ля) с параметром ${paramName} = ${paramValue}`)
    }
}

class Car implements ICarClass {
    id: string
    color: string
    size: CarSize
    type: CarType
    brand: CarBrand

    constructor(car: ICar) {
        this.id = car.id
        this.brand = car.brand
        this.color = car.color
        this.type = car.type ?? 'light'
        this.size = car.size ?? 1
    }

    driveTo (parking: Parking) {
        parking.driveTo(this)
    }

    driveOut (parking: Parking) {
        parking.driveOut(this)
    }
}

const KiaCeed: ICar = {
    id: 'Е688УН70',
    type: 'light',
    brand: 'KIA',
    color: 'grey',
}
const ToyotaYaris: ICar = {
    id: 'E626XX70',
    type: 'light',
    brand: 'TOYOTA',
    color: 'white',
}
const YazHunter: ICar = {
    id: 'Х445УЙ70',
    type: 'hard',
    brand: 'УАЗ',
    color: 'green',
}

const KaftanchikovoParking: IParking = {
    cars: [YazHunter],
    maxPlaceCounter: 3
}

const EX_FathersCarBox = new Parking(KaftanchikovoParking)

const EX_MyCar = new Car(KiaCeed)
const EX_MotherCar = new Car(ToyotaYaris)
EX_MyCar.driveTo(EX_FathersCarBox)
EX_MotherCar.driveTo(EX_FathersCarBox)
EX_FathersCarBox.findAndPrintCarInfo('Е688УН70')
EX_FathersCarBox.findAndPrintCarInfo('ЗАЖОП352')
EX_FathersCarBox.printStaticByParam('color', 'grey')
EX_FathersCarBox.printStaticByParam('type', 'light')
