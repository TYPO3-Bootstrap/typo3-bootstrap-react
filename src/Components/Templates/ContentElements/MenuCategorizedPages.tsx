import React from 'react';
import {TYPO3BootstrapContentElementBaseInterface} from "../../Interfaces";
import MenuCardBase from "./MenuCardBase";

const MenuCategorizedPages: React.FC<TYPO3BootstrapContentElementBaseInterface> = props => {

    return <MenuCardBase {...props}/>
    // return <div className="menuCategorizedPages">
    //     if (condition="{menu}") {
    //     {/*}   <f:render partial="Menu/SkipNavigation" arguments="{_all}" />
    //         <ul>
    //             <f:for each="{menu}" as="page">
    //                 <li>
    //                     <a href="{page.link}"{f:if(condition: page.target, then: ' target="{page.target}"')} title="{page.title}">{page.title}</a>
    //                 </li>
    //             </f:for>
    //         </ul> */}
    //    }
    // </div>
}

export default MenuCategorizedPages;
