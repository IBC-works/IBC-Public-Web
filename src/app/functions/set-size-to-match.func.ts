type Option = {
    ignoreWidth?: boolean,
    ignoreHeight?: boolean
}
export function setSizeToMatch(referenceElement: HTMLElement, target: HTMLElement, opt?: Option) {
    const {clientWidth, clientHeight} = referenceElement

    if(!opt?.ignoreWidth)
        target.style.width = clientWidth + "px"

    if(!opt?.ignoreHeight)
        target.style.height = clientHeight + "px"
}