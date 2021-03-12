'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var section = function (props) {
    if (props.pageTemplate.hasOwnProperty(props.name)) {
        return props.pageTemplate[props.name];
    }
    return React__default['default'].createElement(React__default['default'].Fragment, null,
        "Template section ",
        props.name,
        " not found");
};

var __GenericLayout = function (props) {
    var genericSections = Object.keys(props.pageTemplate).map(function (sectionName) {
        return React__default['default'].createElement("section", { key: sectionName, className: sectionName },
            React__default['default'].createElement(section, { name: sectionName, pageTemplate: props.pageTemplate }));
    });
    return React__default['default'].createElement(React__default['default'].Fragment, null, genericSections);
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
        return React__default['default'].createElement(React__default['default'].Fragment, null,
            "Pagelayout not found: ",
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
        return React__default['default'].createElement(React__default['default'].Fragment, null,
            "Pagetemplate not found: ",
            props.headlessData.page.appereance.backendLayout,
            " ");
    }
    return layout(props.headlessData, template(props.headlessData, props.contentElementLayouts, props.contentElementTemplates));
    // return <>Page: {props.config.navigations.navigation1[0].title}</>
};

var PREFIX_COLPOS = 'colPos';
var Content = function (props) {
    var content = React__default['default'].createElement(React__default['default'].Fragment, null);
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
                return React__default['default'].createElement(React__default['default'].Fragment, null,
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
                return React__default['default'].createElement(React__default['default'].Fragment, null,
                    "CE-template not found: ",
                    props.content.type,
                    " ");
            }
            return React__default['default'].createElement(React__default['default'].Fragment, { key: content.id }, layout({ children: template(content) }));
        });
    }
    return content;
};

var pageLayouts = {
    //TODO: implement example
    'layout-0': function (headlessData, pageTemplate) { return React__default['default'].createElement(React__default['default'].Fragment, null,
        React__default['default'].createElement("header", null, "LOGO"),
        React__default['default'].createElement("section", null,
            React__default['default'].createElement("h1", null, "Hier ist ist eine Section"),
            React__default['default'].createElement(section, { name: 'main', pageTemplate: pageTemplate })),
        React__default['default'].createElement("footer", null,
            React__default['default'].createElement("h3", null, "Hier ist eine andere Section"),
            React__default['default'].createElement(section, { name: 'border', pageTemplate: pageTemplate }))); },
    __generic: function (headlessData, pageTemplate) { return React__default['default'].createElement(React__default['default'].Fragment, null,
        React__default['default'].createElement(__GenericLayout, { headlessData: headlessData, pageTemplate: pageTemplate })); }
};
var pageTemplates = {
    __generic: function (headlessData, contentElementLayouts, contentElementTemplates) {
        return {
            main: React__default['default'].createElement("div", null, "_generisch")
        };
    },
    example: function (headlessData, contentElementLayout, contentElementTemplates) {
        return {
            main: React__default['default'].createElement(React__default['default'].Fragment, null, "...example")
        };
    },
    default: function (headlessData, contentElementLayouts, contentElementTemplates) {
        return {
            main: React__default['default'].createElement("div", null, " .... "),
            footer: React__default['default'].createElement("footer", null, "..."),
            header: React__default['default'].createElement("header", null, "...")
        };
    },
    simple: function (headlessData, contentElementLayouts, contentElementTemplates) {
        return {
            main: React__default['default'].createElement(React__default['default'].Fragment, null,
                React__default['default'].createElement(Content, { colPos: '8', content: headlessData.content, contentElementLayouts: contentElementLayouts, contentElementTemplates: contentElementTemplates }),
                React__default['default'].createElement("div", { className: "section section-default" },
                    React__default['default'].createElement(Content, { colPos: '0', content: headlessData.content, contentElementLayouts: contentElementLayouts, contentElementTemplates: contentElementTemplates })),
                React__default['default'].createElement(Content, { colPos: '9', content: headlessData.content, contentElementLayouts: contentElementLayouts, contentElementTemplates: contentElementTemplates })),
            border: React__default['default'].createElement(React__default['default'].Fragment, null,
                React__default['default'].createElement(Content, { colPos: '3', content: headlessData.content, contentElementLayouts: contentElementLayouts, contentElementTemplates: contentElementTemplates })),
        };
    },
    '2Columns': function (headlessData, contentElementLayouts, contentElementTemplates) {
        return {
            main: React__default['default'].createElement("div", null, "2Columns"),
            footer: React__default['default'].createElement("footer", null, "..."),
            header: React__default['default'].createElement("header", null, "...")
        };
    }
};
var contentElementLayouts = {
    __generic: function (props) {
        console.log(props);
        return React__default['default'].createElement("div", { className: 'contentWrapper' }, props.children);
    },
};
var contentElementTemplates = {
    //Resources/Private/Templates/ContentElements/**
    __generic: function (headlessContentData) { return React__default['default'].createElement("div", { dangerouslySetInnerHTML: { __html: headlessContentData.content.bodytext } }); },
    //text: (headlessContentData) => <Text {...headlessContentData} />,
};
var TYPO3Page = function (props) {
    var _pageLayouts = Object.assign({}, pageLayouts, props.pageLayouts);
    var _pageTemplates = Object.assign({}, pageTemplates, props.pageTemplates);
    var _contentElementLayouts = Object.assign({}, contentElementLayouts, props.contentElementLayouts);
    var _contentElementTemplates = Object.assign({}, contentElementTemplates, props.contentElementTemplates);
    return React__default['default'].createElement(Page, { headlessData: props.headlessData, pageLayouts: _pageLayouts, pageTemplates: _pageTemplates, contentElementLayouts: _contentElementLayouts, contentElementTemplates: _contentElementTemplates });
};
TYPO3Page.defaultProps = {
    pageLayouts: null,
    pageTemplates: null,
    contentElementLayouts: null,
    contentElementTemplates: null,
};

exports.Page = Page;
exports.Section = section;
exports.TYPO3Page = TYPO3Page;
//# sourceMappingURL=index.js.map
