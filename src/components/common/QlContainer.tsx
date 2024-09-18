export default function QlContainer({text}: { text: string }){
    return(
        <div className="ql-container ql-snow max-h-full !border-0">
            <div className="ql-editor p-0" dangerouslySetInnerHTML={{__html:text}}></div>
        </div>
    )
}