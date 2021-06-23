import React, {useEffect, useLayoutEffect} from 'react'

// for redux
import {connect} from 'react-redux'
import {assignCurrentErd} from 'Store/VuerdData'


// 3rd-party
import 'vuerd'
// import 'vuerd/theme/auto-sql.css'
import 'vuerd/theme/vscode-dark.css'

const GenerateVuerd = (props) => {

    let {erdData} = props;
    const {erdName} = props;
    const {onCurrentErd} = props;

    useLayoutEffect(() => {
        generateVuerd()
        //console.log(props)
    }, [erdData]);

    const generateVuerd = () => {
        let container = document.querySelector("#app-erd");
        let editor;
        if(container.children.item(0)) {
            container.removeChild(container.children.item(0))
            editor = document.createElement('erd-editor');
        }
        else
            editor = document.createElement('erd-editor');

        container.appendChild(editor);

        let payload = {
            editor: editor
        }
        onCurrentErd(payload);

        // databaseName에 erdName 집어 넣기!!!!!
        if(erdData.canvas)
        {
            erdData.canvas.databaseName = erdName
        }
        else
        {
            if(Object.keys(erdData).length !== 0)
            {
                let erdDataJson = JSON.parse(erdData)
                erdDataJson.canvas.databaseName = erdName
                erdData = JSON.stringify(erdDataJson)
            }
        }
        const data = erdData

        editor.initLoadJson(data)

        window.addEventListener("resize", () => {
            editor.width = container.parentElement.clientWidth;
            editor.height = container.parentElement.clientHeight;
        });
        window.dispatchEvent(new Event("resize"));
    }

    return (
        <div id="app-erd"></div>
    );
}
const mapToDispatch = (dispatch) => ({
    onCurrentErd: (action) => dispatch(assignCurrentErd(action))
});

export default connect(null, mapToDispatch)(GenerateVuerd);
//export default GenerateVuerd;