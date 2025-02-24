import React from "react"

function CardContent({ 
    children,
    title,
    renderHeader,
    renderFooter,
} : {
    children: React.ReactNode,
    title?: string,
    renderHeader?: React.ReactNode,
    renderFooter?: React.ReactNode,
}) {
    return (
        <div className="card">
            {renderHeader && <div className="card-header">{renderHeader}</div>}
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              {children}
            </div>
            {renderFooter && <div className="card-footer">{renderFooter}</div>}
        </div>
    )
}

export default CardContent