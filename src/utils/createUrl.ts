// @ts-ignore
import urlSchema from "../models/urlSchema"
module.exports = {
     createUrl : (code: string, baseUrl: string, pointerUrl: string, user: string, views: number) => {

        urlSchema.create({
            code: code,
            baseUrl: baseUrl,
            pointerUrl: pointerUrl,
            user: user,
            views: views
        })

    }
}
