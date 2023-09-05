import React from "react";

export const RenderContent = async (contentData, pageProps) => {
    const {contentElementLayouts, contentElementTemplates} = pageProps;


    let template;
    if (contentElementTemplates.hasOwnProperty(contentData.type)) {
        template =await contentElementTemplates[contentData.type](contentData, pageProps);
    } else if (contentElementTemplates.hasOwnProperty('__generic')) {
        template = await contentElementTemplates.__generic(contentData, pageProps);
    } else {
        return <>CE-template not found: {contentData.type} </>
    }

    return <React.Fragment key={contentData.id}>
        {pageProps.contentElementLayouts[contentData.appearance.layout](contentData,template)}
    </React.Fragment>
}//, args: _args
