import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const CommissionSettings: React.FC = () => {
    //form values
    const lowRef = useRef<HTMLInputElement>(null);
    const lowMaxRef = useRef<HTMLInputElement>(null);
    const mediumRef = useRef<HTMLInputElement>(null);
    const mediumMaxRef = useRef<HTMLInputElement>(null);
    const highRef = useRef<HTMLInputElement>(null);
    const highMaxRef = useRef<HTMLInputElement>(null);
    const csiRateRef = useRef<HTMLInputElement>(null);

    //Error state
    const [lowError, setLowError] = useState<string>('');
    const [lowMaxError, setLowMaxError] = useState<string>('');
    const [mediumError, setMediumError] = useState<string>('');
    const [mediumMaxError, setMediumMaxError] = useState<string>('');
    const [highError, setHighError] = useState<string>('');
    const [highMaxError, setHighMaxError] = useState<string>('');
    const [csiRateError, setCsiRateError] = useState<string>('');

    function setErrorState(inputName: string, input: HTMLElement, ref: React.RefObject<HTMLInputElement>){
        var isValid = false;
        if (!ref.current?.value.trim()) {
            // Set the error message
            switch(inputName){
                case 'low':
                    setLowError('Required');
                    break;
                case 'lowMax':
                    setLowMaxError('Required');
                    break;
                case 'medium':
                    setMediumError('Required');
                    break;
                case 'mediumMax':
                    setMediumMaxError('Required');
                    break;
                case 'high':
                    setHighError('Required');
                    break;
                case 'highMax':
                    setHighMaxError('Required');
                    break;
                case 'csiRate':
                    setCsiRateError('Required');
                    break;
            }
            isValid = false;
            // Highlight the input box with red border for visual error
            input?.classList.add('border-2');
            input?.classList.add('border-red-500');
            input?.classList.remove('mb-4');
        }else{
            // Set the error message
            switch(inputName){
                case 'low':
                    setLowError('');
                    break;
                case 'lowMax':
                    setLowMaxError('');
                    break;
                case 'medium':
                    setMediumError('');
                    break;
                case 'mediumMax':
                    setMediumMaxError('');
                    break;
                case 'high':
                    setHighError('');
                    break;
                case 'highMax':
                    setHighMaxError('');
                    break;
                case 'csiRate':
                    setCsiRateError('');
                    break;
            }
            isValid = true;
            // Clear error state if is not empty
            input?.classList.remove('border-2');
            input?.classList.remove('border-red-500');
            input?.classList.add('mb-4');
        }
        return isValid;
    }

    function handleSubmit(){

    }

    return (
        <div>
            <form className="bg-white p-4 w-3/4 h-auto rounded z-10"
            onSubmit={(e) => {
                e.preventDefault(); // Prevent the default form submission behavior
                //submit logic here
                var lowInput = document.getElementById('lowInput');
                var lowMaxInput = document.getElementById('lowMaxInput');
                var mediumInput = document.getElementById('mediumInput');
                var mediumMaxInput = document.getElementById('mediumMaxInput');
                var highInput = document.getElementById('highInput');
                var highMaxInput = document.getElementById('highMaxInput');
                var csiRateInput = document.getElementById('csiRateInput');

                var lowInputValid = setErrorState('low', lowInput!, lowRef);
                var lowMaxInputValid = setErrorState('lowMax', lowMaxInput!, lowMaxRef);
                var mediumInputValid = setErrorState('medium', mediumInput!, mediumRef);
                var mediumMaxInputValid = setErrorState('mediumMax', mediumMaxInput!, mediumMaxRef);
                var highInputValid = setErrorState('high', highInput!, highRef);
                var highMaxInputValid = setErrorState('highMax', highMaxInput!, highMaxRef);
                var csiRateInputValid = setErrorState('csiRate', csiRateInput!, csiRateRef);

                if(lowInputValid && lowMaxInputValid 
                && mediumInputValid && mediumMaxInputValid
                && highInputValid &&  highMaxInputValid
                && csiRateInputValid){
                    handleSubmit();
                }
            }}>

            <h1 style={{
                  fontFamily: "Roboto",
                  fontWeight: 800,
                  letterSpacing: "2px",
                }}>Unit Matrix:</h1>
            <hr/>
            <div className="grid grid-cols-2 w-1/2 mt-2">
                <div>
                    <Label htmlFor="low" style={{
                  fontFamily: "Roboto",
                  fontWeight: 800,
                  letterSpacing: "2px",
                }}>Low:</Label>
                    <Input id="lowInput" type="number" ref={lowRef} maxLength={50} className="w-1/2 mb-4 p-2 border rounded"/>
                    {lowError && (<div className="text-red-500 mb-4">{lowError}</div>)}
                </div>
                <div>
                    <Label htmlFor="lowMax" style={{
                  fontFamily: "Roboto",
                  fontWeight: 800,
                  letterSpacing: "2px",
                }}>Low Max:</Label>
                    <Input id="lowMaxInput" type="number" ref={lowMaxRef} maxLength={50} className="w-1/2 mb-4 p-2 border rounded"/>
                    {lowMaxError && (<div className="text-red-500 mb-4">{lowMaxError}</div>)}
                </div>
                <div>
                    <Label htmlFor="medium" style={{
                  fontFamily: "Roboto",
                  fontWeight: 800,
                  letterSpacing: "2px",
                }}>Medium:</Label>
                    <Input id="mediumInput" type="number" ref={mediumRef} maxLength={50} className="w-1/2 mb-4 p-2 border rounded"/>
                    {mediumError && (<div className="text-red-500 mb-4">{mediumError}</div>)}
                </div>
                <div>
                    <Label htmlFor="mediumMax" style={{
                  fontFamily: "Roboto",
                  fontWeight: 800,
                  letterSpacing: "2px",
                }}>Medium Max:</Label>
                    <Input id="mediumMaxInput" type="number" ref={mediumMaxRef} maxLength={50} className="w-1/2 mb-4 p-2 border rounded"/>
                    {mediumMaxError && (<div className="text-red-500 mb-4">{mediumMaxError}</div>)}
                </div>
                <div>
                    <Label htmlFor="high" style={{
                  fontFamily: "Roboto",
                  fontWeight: 800,
                  letterSpacing: "2px",
                }}>High:</Label>
                    <Input id="highInput" type="number" ref={highRef} maxLength={50} className="w-1/2 mb-4 p-2 border rounded"/>
                    {highError && (<div className="text-red-500 mb-4">{highError}</div>)}
                </div>
                <div>
                    <Label htmlFor="mediumMax" style={{
                  fontFamily: "Roboto",
                  fontWeight: 800,
                  letterSpacing: "2px",
                }}>High Max:</Label>
                    <Input id="highMaxInput" type="number" ref={highMaxRef} maxLength={50} className="w-1/2 mb-4 p-2 border rounded"/>
                    {highMaxError && (<div className="text-red-500 mb-4">{highMaxError}</div>)}
                </div>
                <div>
                    <Label htmlFor="csiRate" style={{
                  fontFamily: "Roboto",
                  fontWeight: 800,
                  letterSpacing: "2px",
                }}>CSI Rate %:</Label>
                    <Input id="csiRateInput" type="number" ref={csiRateRef} maxLength={50} className="w-1/2 mb-4 p-2 border rounded"/>
                    {csiRateError && (<div className="text-red-500 mb-4">{csiRateError}</div>)}
                </div>
            </div>
            

            <Button type="submit" className="bg-green-600 hover:bg-green-800 mt-5 mb-0" style={{
              fontFamily: "Roboto",
              fontWeight: 800,
              letterSpacing: "2px",
            }}>Submit</Button>
          </form> 
        </div>
    );
};

export default CommissionSettings;