import React from 'react';

var section = function (props) {
    if (props.pageTemplate.hasOwnProperty(props.name)) {
        return props.pageTemplate[props.name];
    }
    return React.createElement(React.Fragment, null,
        "Template section ",
        props.name,
        " not found");
};

var __GenericLayout = function (props) {
    var genericSections = Object.keys(props.pageTemplate).map(function (sectionName) {
        return React.createElement("section", { key: sectionName, className: sectionName },
            React.createElement(section, { name: sectionName, pageTemplate: props.pageTemplate }));
    });
    return React.createElement(React.Fragment, null, genericSections);
};

var Page = function (props) {
    var layout;
    if (props.pageLayouts.hasOwnProperty(props.headlessData.page.appearance.layout)) {
        layout = props.pageLayouts[props.headlessData.page.appearance.layout];
    }
    else if (props.pageLayouts.hasOwnProperty('__generic')) {
        layout = props.pageLayouts.__generic;
    }
    else {
        return React.createElement(React.Fragment, null,
            "Page-layout not found: ",
            props.headlessData.page.appearance.layout);
    }
    var template;
    if (props.pageTemplates.hasOwnProperty(props.headlessData.page.appearance.backendLayout)) {
        template = props.pageTemplates[props.headlessData.page.appearance.backendLayout];
    }
    else if (props.pageTemplates.hasOwnProperty('__generic')) {
        template = props.pageTemplates.__generic;
    }
    else {
        return React.createElement(React.Fragment, null,
            "Page-template not found: ",
            props.headlessData.page.appereance.backendLayout,
            " ");
    }
    return layout(props.headlessData, template(props.headlessData, props.contentElementLayouts, props.contentElementTemplates));
    // return <>Page: {props.config.navigations.navigation1[0].title}</>
};

var PREFIX_COLPOS = 'colPos';
var Content = function (props) {
    var content = React.createElement(React.Fragment, null);
    if (props.content.hasOwnProperty(PREFIX_COLPOS + props.colPos)) {
        content = props.content[PREFIX_COLPOS + props.colPos].map(function (content) {
            var layout;
            if (props.contentElementLayouts.hasOwnProperty(content.appearance.layout)) {
                layout = props.contentElementLayouts[content.appearance.layout];
            }
            else if (props.contentElementLayouts.hasOwnProperty('__generic')) {
                layout = props.contentElementLayouts.__generic;
            }
            else {
                return React.createElement(React.Fragment, null,
                    "CE-layout not found: ",
                    props.content.appearance.layout);
            }
            var template;
            if (props.contentElementTemplates.hasOwnProperty(content.type)) {
                template = props.contentElementTemplates[content.type];
            }
            else if (props.contentElementTemplates.hasOwnProperty('__generic')) {
                template = props.contentElementTemplates.__generic;
            }
            else {
                return React.createElement(React.Fragment, null,
                    "CE-template not found: ",
                    props.content.type,
                    " ");
            }
            return React.createElement(React.Fragment, { key: content.id }, layout({ children: template(content, props.args), content: content, args: props.args }));
        });
    }
    return content;
};

var Text = function (props) {
    return React.createElement("div", { dangerouslySetInnerHTML: { __html: props.data.bodytext } });
};

var Textpic = function (props) {
    return React.createElement("div", { className: "textpic" },
        React.createElement("div", { className: "textpic-item textpic-gallery" }),
        React.createElement("div", { className: "textpic-item textpic-text" },
            React.createElement("div", { dangerouslySetInnerHTML: { __html: props.data.bodytext } })));
};

var BackgroundImage = function (props) {
    if (props.data.appearance.backgroundImage.length < 1) {
        return null;
    }
    var backgroundImageObject = props.data.appearance.backgroundImage[0];
    var backgroundImageIdentifier = 'frame-backgroundimage-' + props.data.id;
    var backgroundImageClasses = 'frame-backgroundimage';
    if (props.data.appearance.backgroundImageOptions.parallax === '1') {
        backgroundImageClasses += ' frame-backgroundimage-parallax';
    }
    if (props.data.appearance.backgroundImageOptions.fade === '1') {
        backgroundImageClasses += ' frame-backgroundimage-fade';
    }
    if (props.data.appearance.backgroundImageOptions.filter !== '') {
        backgroundImageClasses += ' frame-backgroundimage-' + props.data.appearance.backgroundImageOptions.filter;
    }
    //TODO: Implement crop sizes
    return React.createElement("div", { className: "frame-backgroundimage-container" },
        React.createElement("div", { id: backgroundImageIdentifier, className: backgroundImageClasses, style: { backgroundImage: 'url("' + backgroundImageObject.publicUrl + '")' } }));
};

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var HeaderLink = function (props) {
    // console.log(props);
    if (props.headerLink === null) {
        return React.createElement(React.Fragment, null, props.children);
    }
    // console.log(props.headerLink);
    return React.createElement("a", __assign({ href: props.headerLink.url }, props.headerLink.target, props.headerLink.aTagParams), props.children);
};

var Header = function (props) {
    // console.log(props.headerLink);
    switch (props.layout) {
        case 1:
            return React.createElement("h1", { className: props.class + ' ' + props.positionClass },
                React.createElement(HeaderLink, { headerLink: props.headerLink },
                    React.createElement("span", null, props.header)));
        default:
            return React.createElement("h2", { className: props.class + ' ' + props.positionClass },
                React.createElement(HeaderLink, { headerLink: props.headerLink },
                    React.createElement("span", null, props.header)));
        //         <f:case value="1">
        //
        //         </f:case>
        //         <f:case value="2">
        //             <h2 className="{class} {positionClass}">
        //                 <f:link.typolink parameter="{link}"><span>{header}</span></f:link.typolink>
        //             </h2>
        //         </f:case>
        //         <f:case value="3">
        //             <h3 className="{class} {positionClass}">
        //                 <f:link.typolink parameter="{link}"><span>{header}</span></f:link.typolink>
        //             </h3>
        //         </f:case>
        //         <f:case value="4">
        //             <h4 className="{class} {positionClass}">
        //                 <f:link.typolink parameter="{link}"><span>{header}</span></f:link.typolink>
        //             </h4>
        //         </f:case>
        //         <f:case value="5">
        //             <h5 className="{class} {positionClass}">
        //                 <f:link.typolink parameter="{link}"><span>{header}</span></f:link.typolink>
        //             </h5>
        //         </f:case>
        //         <f:case value="6">
        //             <h6 className="{class} {positionClass}">
        //                 <f:link.typolink parameter="{link}"><span>{header}</span></f:link.typolink>
        //             </h6>
        //         </f:case>
        //         <f:case value="100">
        //             <f:comment> -- do not show header --</f:comment>
        //         </f:case>
        //         <f:defaultCase>
        //             <f:if condition="{default}">
        //                 <f:render partial="Header/Header" arguments="{
        //                 header: header,
        //                 layout: default,
        //                 class: class,
        //                 positionClass: positionClass,
        //                 link: link}"/>
        //             </f:if>
        //         </f:defaultCase>
    }
};
Header.defaultProps = {
    class: 'element-header',
    headerLink: null
};

var AllHeader = function (props) {
    // console.log(props);
    // console.log(props.data);
    // <f:if condition="{data.header_layout} != 100">
    //     <f:if condition="{data.header} || {data.subheader} || {data.date}">
    //         <header className="frame-header">
    //             <f:render partial="Header/Header" arguments="{
    //             header: data.header,
    //             layout: data.header_layout,
    //             class: settings.header.class,
    //             positionClass: '{f:if(condition: data.header_position, then: \'text-{data.header_position}\')}',
    //             link: data.header_link,
    //             default: settings.header.defaultHeaderType}"/>
    //             <f:render partial="Header/SubHeader" arguments="{
    //             subheader: data.subheader,
    //             layout: data.header_layout,
    //             class: settings.subheader.class,
    //             positionClass: '{f:if(condition: data.header_position, then: \'text-{data.header_position}\')}',
    //             default: settings.header.defaultHeaderType}"/>
    //             <f:render partial="Header/Date" arguments="{
    //             date: data.date,
    //             format: settings.header.date.format,
    //             positionClass: '{f:if(condition: data.header_position, then: \'text-{data.header_position}\')}'}"/>
    //         </header>
    //     </f:if>
    // </f:if>
    var content = React.createElement(React.Fragment, null);
    if (props.data.content.headerLayout !== 100) {
        if (props.data.content.header !== '' || props.data.content.header !== '' || props.data.content.date !== '') {
            content = React.createElement("header", { className: "frame-header" }, props.data.content.header !== '' ?
                React.createElement(Header, { layout: props.data.content.headerLayout, positionClass: props.data.headerPosition ? 'text-' + props.data.content.headerPosition : null, header: props.data.content.header, headerLink: props.data.content.headerLink !== '' ? props.data.content.headerLink : null })
                :
                    null);
        }
    }
    return content;
};

var Layout0 = function (props) {
    var frameClass = 'frame-' + props.data.appearance.frameClass;
    var typeClass = 'frame-type-' + props.data.type;
    var layoutClass = 'frame-layout-' + props.data.appearance.layout;
    var backgroundClass = 'frame-background-' + (props.data.appearance.backgroundColor !== '' ? props.data.appearance.backgroundColor : 'none');
    var spaceBeforeClass = 'frame-space-before-' + (props.data.appearance.spaceBefore !== '' ? props.data.appearance.spaceBefore : 'none');
    var spaceAfterClass = 'frame-space-after-' + (props.data.appearance.spaceAfter !== '' ? props.data.appearance.spaceAfter : 'none');
    var content;
    if (props.data.appearance.frameClass !== 'none') {
        var backgroundImageClass = (props.data.appearance.backgroundImage.length > 0 ? 'frame-has-backgroundimage' : 'frame-no-backgroundimage');
        content = React.createElement("div", { id: "c" + props.data.id, className: "frame " +
                frameClass + " " +
                typeClass + " " +
                layoutClass + " " +
                backgroundClass + " " +
                backgroundImageClass + " " +
                spaceBeforeClass + " " +
                spaceAfterClass },
            React.createElement(BackgroundImage, { data: props.data }),
            React.createElement("div", { className: "frame-container" },
                React.createElement("div", { className: "frame-inner" },
                    props.data._localizedUid ? React.createElement("a", { id: "c" + props.data._localizedUid }) : null,
                    React.createElement(AllHeader, { data: props.data }),
                    props.children)));
    }
    else {
        content = React.createElement(React.Fragment, null,
            React.createElement("a", { id: "c" + props.data.id }),
            props.data._localizedUid ? React.createElement("a", { id: "c" + props.data._localizedUid }) : null,
            props.data.appearance.spaceBefore ? React.createElement("div", { className: spaceBeforeClass }) : null,
            React.createElement(AllHeader, { data: props.data }),
            props.children,
            props.data.appearance.spaceAfter ? React.createElement("div", { className: spaceAfterClass }) : null);
    }
    return content;
};

var pageLayouts = {
    //TODO: implement example
    'layout-0': function (headlessData, pageTemplate, args) {
        return React.createElement(React.Fragment, null,
            React.createElement("header", null, "LOGO"),
            React.createElement("section", null,
                React.createElement("h1", null, "Hier ist ist eine Section"),
                React.createElement(section, { name: 'main', pageTemplate: pageTemplate })),
            React.createElement("footer", null,
                React.createElement("h3", null, "Hier ist eine andere Section"),
                React.createElement(section, { name: 'border', pageTemplate: pageTemplate })));
    },
    __generic: function (headlessData, pageTemplate, args) {
        return React.createElement(React.Fragment, null,
            React.createElement(__GenericLayout, { headlessData: headlessData, pageTemplate: pageTemplate }));
    }
};
var pageTemplates = {
    __generic: function (headlessData, contentElementLayouts, contentElementTemplates, args) {
        return {
            main: React.createElement("div", null, "_generisch")
        };
    },
    example: function (headlessData, contentElementLayout, contentElementTemplates, args) {
        return {
            main: React.createElement(React.Fragment, null, "...example")
        };
    },
    default: function (headlessData, contentElementLayouts, contentElementTemplates, args) {
        return {
            main: React.createElement("div", null, " .... "),
            footer: React.createElement("footer", null, "..."),
            header: React.createElement("header", null, "...")
        };
    },
    simple: function (headlessData, contentElementLayouts, contentElementTemplates, args) {
        return {
            main: React.createElement(React.Fragment, null,
                React.createElement(Content, { colPos: '8', content: headlessData.content, contentElementLayouts: contentElementLayouts, contentElementTemplates: contentElementTemplates }),
                React.createElement("div", { className: "section section-default" },
                    React.createElement(Content, { colPos: '0', content: headlessData.content, contentElementLayouts: contentElementLayouts, contentElementTemplates: contentElementTemplates })),
                React.createElement(Content, { colPos: '9', content: headlessData.content, contentElementLayouts: contentElementLayouts, contentElementTemplates: contentElementTemplates })),
            border: React.createElement(React.Fragment, null,
                React.createElement(Content, { colPos: '3', content: headlessData.content, contentElementLayouts: contentElementLayouts, contentElementTemplates: contentElementTemplates })),
        };
    },
    '2Columns': function (headlessData, contentElementLayouts, contentElementTemplates, args) {
        return {
            main: React.createElement("div", null, "2Columns"),
            footer: React.createElement("footer", null, "..."),
            header: React.createElement("header", null, "...")
        };
    }
};
var contentElementLayouts = {
    __generic: function (props) {
        return React.createElement(Layout0, { data: props.content }, props.children);
    },
};
var contentElementTemplates = {
    //Resources/Private/Templates/ContentElements/**
    __generic: function (headlessContentData, args) {
        return React.createElement(React.Fragment, null, headlessContentData.type);
    },
    text: function (headlessContentData, args) {
        return React.createElement(Text, { data: headlessContentData.content });
    },
    textpic: function (headlessContentData, args) {
        return React.createElement(Textpic, { data: headlessContentData.content });
    }
};
var TYPO3Page = function (props) {
    var _pageLayouts = Object.assign({}, pageLayouts, props.pageLayouts);
    var _pageTemplates = Object.assign({}, pageTemplates, props.pageTemplates);
    var _contentElementLayouts = Object.assign({}, contentElementLayouts, props.contentElementLayouts);
    var _contentElementTemplates = Object.assign({}, contentElementTemplates, props.contentElementTemplates);
    return React.createElement(Page, { headlessData: props.headlessData, pageLayouts: _pageLayouts, pageTemplates: _pageTemplates, contentElementLayouts: _contentElementLayouts, contentElementTemplates: _contentElementTemplates });
};
TYPO3Page.defaultProps = {
    pageLayouts: null,
    pageTemplates: null,
    contentElementLayouts: null,
    contentElementTemplates: null,
};

export { Content, Page, section as Section, TYPO3Page };
//# sourceMappingURL=index.es.js.map
