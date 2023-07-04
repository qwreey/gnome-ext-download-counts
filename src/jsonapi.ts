import {
    type instance
} from "./index"
import { Type } from '@sinclair/typebox'

export default function(instance: instance, _options:any, done:VoidFunction) {

    instance.get("/json/:id",{
        schema: {
            params: Type.Object({
                id: Type.Number()
            })
        } as const,
        async handler(request, reply) {
            let info = await instance.api.getExtensionInformation(request.params.id.toString())
            reply.send(info)
        }
    })

    done()
}
