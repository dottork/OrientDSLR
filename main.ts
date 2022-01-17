input.onButtonPressed(Button.A, function () {
    visualizza = !(visualizza)
    vis_bussola = false
})
input.onButtonPressed(Button.B, function () {
    vis_bussola = !(visualizza)
    visualizza = false
})
let t3 = ""
let t2 = ""
let t1 = ""
let t = ""
let rollio = 0
let beccheggio = 0
let bussola = 0
let vis_bussola = false
let visualizza = false
serial.redirectToUSB()
visualizza = false
vis_bussola = false
input.calibrateCompass()
basic.forever(function () {
    bussola = 0
    beccheggio = 0
    rollio = 0
    for (let index = 0; index < 20; index++) {
        bussola += input.compassHeading()
        beccheggio += input.rotation(Rotation.Pitch)
        rollio += input.rotation(Rotation.Roll)
    }
    bussola = Math.round(bussola / 20)
    beccheggio = Math.round(beccheggio / 20)
    rollio = Math.round(rollio / 20)
    t = "......" + convertToText(beccheggio)
    t1 = t.substr(t.length - 4, 5)
    t = "......" + convertToText(rollio)
    t2 = t.substr(t.length - 4, 5)
    t = "......" + convertToText(bussola)
    t3 = t.substr(t.length - 4, 5)
    serial.writeLine("" + t1 + "," + t2 + "," + t3)
    basic.pause(200)
})
basic.forever(function () {
    if (visualizza) {
        basic.showNumber(input.rotation(Rotation.Pitch))
    }
    if (vis_bussola) {
        basic.showNumber(input.compassHeading())
    }
})
