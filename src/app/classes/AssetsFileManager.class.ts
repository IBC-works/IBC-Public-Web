export class AssetsFileManager {
    private base = "/assets"

    getImage(name: string, ext: string, pathCommands: string[] = []){
        return this.base + "/images" + this.pathjoin(pathCommands) + `${name}.${ext}`
    }

    private pathjoin (pathCommands: string[]){
        let result = "/"

        for (let i = 0; i < pathCommands.length; i++) {
            const command = pathCommands[i]

            result += command + '/'
        }

        return result
    }
}