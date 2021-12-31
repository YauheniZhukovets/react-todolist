import {ActionType, mult, salaryReducer, sub, sum, sumAC} from "./tasks";


test("sum", () => {
    //1. Тестовые данные
    const a: number = 570
    const b: number = 330
    //2. Выполнение тестируемого кода
    const result = sum(a, b)
    //3. Проверка ожидаемого рез-та
    expect(result).toBe(900)
})

test("sub", () => {
    //1. Тестовые данные
    const a: number = 570
    const b: number = 30
    //2. Выполнение тестируемого кода
    const result = sub(a, b)
    //3. Проверка ожидаемого рез-та
    expect(result).toBe(540)
})

test("mult", () => {
    expect(mult(570, 3)).toBe(1710)
})

test("salaryReducer", () => {
    const sumAction = sumAC(330) // {..........}
    expect(salaryReducer(570, sumAction)).toBe(900)
})