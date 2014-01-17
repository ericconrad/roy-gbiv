function modifyBase(hue) {
    if (hue <= 60) {
        return hue * 2;
    }

    if (hue <= 120) {
        return hue + 60;
    }

    if (hue <= 240) {
        return ((hue - 120) / 2) + 180;
    }

    if (hue <= 270) {
        return ((hue - 240) * 2) + 240;
    }

    return ((hue - 270) * (2/3)) + 300;
}

function modifyResult(hue) {
    if (hue <= 120) {
        return hue/2;
    }

    if (hue <= 180) {
        return hue - 60;
    }

    if (hue <= 240) {
        return ((hue - 180) * 2) + 120;
    }

    if (hue <= 300) {
        return ((hue - 240) / 2) + 240;
    }

    return ((hue - 300) * 1.5) + 270;
}


function computeRyb(base, modifier) {
    var result = modifyBase(base) + modifier;
    if (result > 360) { result -= 360; }
    if (result < 0) { result += 360; }

    return modifyResult(result);
};