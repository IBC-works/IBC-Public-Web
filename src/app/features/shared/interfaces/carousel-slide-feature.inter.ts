export default interface CarouselSlideFeature {
    isVisible?:  boolean,

    onVisible?: () => void,

    onNotVisible?: () => void
}