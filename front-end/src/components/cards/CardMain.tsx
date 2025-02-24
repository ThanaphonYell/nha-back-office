import React from "react"
import Breadcrumb, { IBreadcrumb } from "../breadcrumb/Breadcrumb"

function CardMain({ 
    children,
    breadcrumbs
} : {
    children: React.ReactNode,
    breadcrumbs?: Array<IBreadcrumb>
}) {

    return (
        <>
            {(breadcrumbs && Array.isArray(breadcrumbs)) && <Breadcrumb breadcrumbs={breadcrumbs} />}
            <section className="section">
                {children}
            </section>
        </>
    )
}

export default CardMain