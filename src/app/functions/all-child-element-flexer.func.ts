export function AllChildElementFlexer(parentElement: HTMLElement, exceptions: string[]) {
    parentElement.style.display = "flex"

    for (let i = 0; i < parentElement.children.length; i++) {
        const child = parentElement.children.item(i)
        
        if(!child) continue

        const {tagName} = child
    
        if(exceptions.includes(tagName.toLowerCase())) continue

        //@ts-ignore
        child.style.flex = "1"
    }
}