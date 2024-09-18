import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

const InputCommission: React.FC = () => {
    //form values
    const totalCarsRef = useRef<HTMLInputElement>(null);
    const csiMetRef = useRef<HTMLButtonElement>(null);
    const othersRef = useRef<HTMLInputElement>(null);
    const bonusRef = useRef<HTMLInputElement>(null);

    //Error state
    const [totalCarsError, setTotalCarsError] = useState<string>('');
    const [csiMetError, setCsiMetError] = useState<string>('');
    const [othersError, setOthersError] = useState<string>('');
    const [bonusError, setBonusError] = useState<string>('');

    function setErrorState(inputName: string, input: HTMLElement, ref: React.RefObject<HTMLInputElement> | React.RefObject<HTMLButtonElement>){
        var isValid = false;
        if (!ref.current?.value.trim()) {
            // Set the error message
            switch(inputName){
                case 'totalCars':
                    setTotalCarsError('Required');
                    break;
                case 'csiMet':
                    setCsiMetError('Required');
                    break;
                case 'others':
                    setOthersError('Required');
                    break;
                case 'bonus':
                    setBonusError('Required');
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
                case 'totalCars':
                    setTotalCarsError('');
                    break;
                case 'csiMet':
                    setCsiMetError('');
                    break;
                case 'others':
                    setOthersError('');
                    break;
                case 'bonus':
                    setBonusError('');
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
            <form className="bg-white p-4 w-3/4 h-auto rounded z-10"
            onSubmit={(e) => {
                e.preventDefault(); // Prevent the default form submission behavior
                //submit logic here
                var totalCarsInput = document.getElementById('totalCarsInput');
                var csiMetInput = document.getElementById('csiMetInput');
                var othersInput = document.getElementById('othersInput');
                var bonusInput = document.getElementById('bonusInput');

                var totalCarsInputValid = setErrorState('totalCars', totalCarsInput!, totalCarsRef);
                var csiMetInputValid = setErrorState('csiMet', csiMetInput!, csiMetRef);
                var othersInputValid = setErrorState('others', othersInput!, othersRef);
                var bonusInputValid = setErrorState('bonus', bonusInput!, bonusRef);

                if(totalCarsInputValid && csiMetInputValid 
                && othersInputValid && bonusInputValid){
                    handleSubmit();
                }
            }}>

            <h1 style={{
                  fontFamily: "Roboto",
                  fontWeight: 800,
                  letterSpacing: "2px",
                }}>Please enter the info below to view your commission:</h1>
            <hr/>
            <div className="grid grid-cols-2 w-1/2 mt-2">
                <div>
                    <Label htmlFor="totalCars" style={{
                  fontFamily: "Roboto",
                  fontWeight: 800,
                  letterSpacing: "2px",
                }}>Total Cars:</Label>
                    <Input id="totalCarsInput" type="number" ref={totalCarsRef} maxLength={50} className="w-1/2 mb-4 p-2 border rounded"/>
                    {totalCarsError && (<div className="text-red-500 mb-4">{totalCarsError}</div>)}
                </div>
                <div>
                    <Label htmlFor="csiMet" style={{
                  fontFamily: "Roboto",
                  fontWeight: 800,
                  letterSpacing: "2px",
                }}>CSI Met:</Label>
                    {/* <Input id="csiMetInput" type="number" ref={csiMetRef} maxLength={50} className="w-1/2 mb-4 p-2 border rounded"/> */}
                    <RadioGroup>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1" id="r1" />
                        <Label htmlFor="r1">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="0" id="r2" />
                        <Label htmlFor="r2">No</Label>
                    </div>
                    </RadioGroup>
                    {csiMetError && (<div className="text-red-500 mb-4">{csiMetError}</div>)}
                </div>
                <div>
                    <Label htmlFor="others" style={{
                  fontFamily: "Roboto",
                  fontWeight: 800,
                  letterSpacing: "2px",
                }}>Others:</Label>
                    <Input id="othersInput" type="number" ref={othersRef} maxLength={50} className="w-1/2 mb-4 p-2 border rounded"/>
                    {othersError && (<div className="text-red-500 mb-4">{othersError}</div>)}
                </div>
                <div>
                    <Label htmlFor="bonus" style={{
                  fontFamily: "Roboto",
                  fontWeight: 800,
                  letterSpacing: "2px",
                }}>Bonus:</Label>
                    <Input id="bonusInput" type="number" ref={bonusRef} maxLength={50} className="w-1/2 mb-4 p-2 border rounded"/>
                    {bonusError && (<div className="text-red-500 mb-4">{bonusError}</div>)}
                </div>
            </div>
            
            <Button type="submit" className="bg-green-600 hover:bg-green-800 mt-5 mb-0" style={{
              fontFamily: "Roboto",
              fontWeight: 800,
              letterSpacing: "2px",
            }}>Submit</Button>
          </form> 
    );
};

export default InputCommission;