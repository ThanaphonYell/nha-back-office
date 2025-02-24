import React from "react"

function Img(prop: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) {
  return (
    <>
        <img {...prop} alt={prop?.alt ?? ''} />
    </>
  )
}

export default Img