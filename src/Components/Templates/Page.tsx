import React from "react";
import {TYPO3PagePropsInterface} from "../Interfaces";


const Page: React.FC<TYPO3PagePropsInterface> = props => {
    let layout;
    if(props.pageLayouts.hasOwnProperty(props.config.page.appearance.layout)) {
        layout = props.pageLayouts[props.config.page.appearance.layout];
    } else if(props.pageLayouts.hasOwnProperty('__generic')) {
        layout = props.pageLayouts.__generic;
    } else {
        return <>Page Layout not found: {props.config.page.appearance.layout}</>
    }

    let pageTemplate;
    if(props.pageTemplates.hasOwnProperty(props.config.page.appearance.backendLayout)) {
        pageTemplate = props.pageTemplates[props.config.page.appearance.backendLayout];
    } else if (props.pageTemplates.hasOwnProperty('__generic')) {
        pageTemplate = props.pageTemplates.__generic;
    } else {
        return <>Page Template not found: {props.config.page.appereance.backendLayout} </>
    }


    return layout(
        props.config,
        pageTemplate(props.config, props.contentElementLayouts, props.contentElementTemplates),
        props.contentElementLayouts,
        props.contentElementTemplates
    );
    // return <>Page: {props.config.navigations.navigation1[0].title}</>
}


export default Page;