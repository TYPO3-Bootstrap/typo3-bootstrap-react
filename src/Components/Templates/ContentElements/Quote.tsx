import React from "react"

interface IQuoteData {
    bodytext: string,
    quoteLink: {
        href: string,
        target?: string,
        class?: string,
        title?: string,
        linkText: string,
        additionalAttributes: []
    } | string,
    quoteSource: string
}

const Quote: React.FC<{ data: IQuoteData }> = (props) => {
    const {bodytext, quoteSource, quoteLink} = props.data

    let sourceLink = () => {
        if (typeof quoteLink === 'object' && quoteLink !== null) {
            const {href, target, title, linkText} = quoteLink
            const className = quoteLink['class']
            return <span>
                (<a href={href} target={target} title={title} className={className}>{linkText}</a>)
            </span>
        }
        return <></>
    }

    const bodyTemplate = () => {
        return (bodytext.length > 0) ? <p>{bodytext}</p> : <></>
    }

    const figcaptionTemplate = () => {
        if(quoteSource.length > 0){
            return <figcaption className="blockquote-footer">
                <cite title={quoteSource}>{quoteSource}{sourceLink()}</cite>
            </figcaption>
        }

        return <></>
    }

    return <figure>
        <blockquote className={'blockquote'}>{bodyTemplate()}</blockquote>
        {figcaptionTemplate()}
    </figure>
}

export default Quote