export function observeResize(element: HTMLElement, cb: (pbsererEntry: ResizeObserverEntry) => void) {
    const resizer = new ResizeObserver((entries) => {
        for (const entry of entries) {
            cb(entry)        
        }
    })


    resizer.observe(element)
}