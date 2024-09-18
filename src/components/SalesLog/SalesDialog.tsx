import React from "react";
import { ISalesDialog } from "@/interfaces/ISalesDialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";

const SalesDialog: React.FC<ISalesDialog> = ({
  isDialogOpen,
  clearDialog,
  clearViewDialog,
  stockNumberRef,
  setStockNumberError,
  stockNumberError,
  typeRef,
  setTypeError,
  typeError,
  makeRef,
  setMakeError,
  makeError,
  modelRef,
  setModelError,
  modelError,
  yearRef,
  yearError,
  setYearError,
  costRef,
  costError,
  setCostError,
  saleAmountRef,
  saleAmountError,
  setSaleAmountError,
  colorRef,
  colorError,
  setColorError,
  dateRef,
  dateError,
  setDateError,
  vinRef,
  vinError,
  setVinError,
  leaseAmountRef,
  leaseAmountError,
  setLeaseAmountError,
  tradeAmountRef,
  tradeAmountError,
  setTradeAmountError,
  customerNameRef,
  customerNameError,
  setCustomerNameError,
  handleDialogSubmit,
  tempSale,
}) => {
  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={clearDialog}>
        <DialogContent className="min-w-[1000px] max-w-[1000px] max-h-[500px] min-h-[300px]">
          <form
            onSubmit={(e) => {
              clearViewDialog();
              e.preventDefault(); // Prevent the default form submission behavior
              var stockNumberInput =
                document.getElementById("stockNumberInput");
              var typeInput = document.getElementById("typeInput");
              var makeInput = document.getElementById("makeInput");
              var modelInput = document.getElementById("modelInput");
              var yearInput = document.getElementById("yearInput");
              var costInput = document.getElementById("costInput");
              var saleAmountInput = document.getElementById("saleAmountInput");
              var colorInput = document.getElementById("colorInput");
              var dateInput = document.getElementById("dateInput");
              var vinInput = document.getElementById("vinInput");
              var leaseAmountInput =
                document.getElementById("leaseAmountInput");
              var tradeAmountInput =
                document.getElementById("tradeAmountInput");
              var customerNameInput =
                document.getElementById("customerNameInput");

              var stockNumberValid = false;
              var typeValid = false;
              var makeValid = false;
              var modelValid = false;
              var yearValid = false;
              var costValid = false;
              var saleAmountValid = false;
              var colorValid = false;
              var dateValid = false;
              var vinValid = false;
              var leaseAmountValid = false;
              var tradeAmountValid = false;
              var customerNameValid = false;
              if (!stockNumberRef.current?.value.trim()) {
                // Set the stockNumber error message
                setStockNumberError("Stock Number is required");
                stockNumberValid = false;
                // Highlight the input box with red border for visual error
                stockNumberInput?.classList.add("border-2");
                stockNumberInput?.classList.add("border-red-500");
                stockNumberInput?.classList.remove("mb-4");
              } else {
                // Set the stockNumber error message
                setStockNumberError("");
                stockNumberValid = true;
                // Clear error state if stockNumber is not empty
                stockNumberInput?.classList.remove("border-2");
                stockNumberInput?.classList.remove("border-red-500");
                stockNumberInput?.classList.add("mb-4");
              }
              if (!typeRef.current?.value.trim()) {
                // Set the type error message
                setTypeError("Type is required");
                typeValid = false;
                // Highlight the input box with red border for visual error
                typeInput?.classList.add("border-2");
                typeInput?.classList.add("border-red-500");
                typeInput?.classList.remove("mb-4");
              } else {
                // Set the type error message
                setTypeError("");
                typeValid = true;
                // Clear error state if type is not empty
                typeInput?.classList.remove("border-2");
                typeInput?.classList.remove("border-red-500");
                typeInput?.classList.add("mb-4");
              }
              if (!makeRef.current?.value.trim()) {
                // Set the make error message
                setMakeError("Make is required");
                makeValid = false;
                // Highlight the input box with red border for visual error
                makeInput?.classList.add("border-2");
                makeInput?.classList.add("border-red-500");
                makeInput?.classList.remove("mb-4");
              } else {
                // Set the make error message
                setMakeError("");
                makeValid = true;
                // Clear error state if make is not empty
                makeInput?.classList.remove("border-2");
                makeInput?.classList.remove("border-red-500");
                makeInput?.classList.add("mb-4");
              }
              if (
                !yearRef.current?.value.trim() ||
                isNaN(Number(yearRef.current?.value.trim()))
              ) {
                // Set the year error message
                setYearError("Year is required and must be a valid number");
                yearValid = false;
                // Highlight the input box with red border for visual error
                yearInput?.classList.add("border-2");
                yearInput?.classList.add("border-red-500");
                yearInput?.classList.remove("mb-4");
              } else {
                // Set the year error message
                setYearError("");
                yearValid = true;
                // Clear error state if year is valid
                yearInput?.classList.remove("border-2");
                yearInput?.classList.remove("border-red-500");
                yearInput?.classList.add("mb-4");
              }
              if (
                !costRef.current?.value.trim() ||
                isNaN(Number(costRef.current?.value.trim()))
              ) {
                // Set the cost error message
                setCostError("Cost is required and must be a valid number");
                costValid = false;
                // Highlight the input box with red border for visual error
                costInput?.classList.add("border-2");
                costInput?.classList.add("border-red-500");
                costInput?.classList.remove("mb-4");
              } else {
                // Set the cost error message
                setCostError("");
                costValid = true;
                // Clear error state if cost is valid
                costInput?.classList.remove("border-2");
                costInput?.classList.remove("border-red-500");
                costInput?.classList.add("mb-4");
              }
              if (
                !saleAmountRef.current?.value.trim() ||
                isNaN(Number(saleAmountRef.current?.value.trim()))
              ) {
                // Set the saleAmount error message
                setSaleAmountError(
                  "Sale Amount is required and must be a valid number"
                );
                saleAmountValid = false;
                // Highlight the input box with red border for visual error
                saleAmountInput?.classList.add("border-2");
                saleAmountInput?.classList.add("border-red-500");
                saleAmountInput?.classList.remove("mb-4");
              } else {
                // Set the saleAmount error message
                setSaleAmountError("");
                saleAmountValid = true;
                // Clear error state if saleAmount is valid
                saleAmountInput?.classList.remove("border-2");
                saleAmountInput?.classList.remove("border-red-500");
                saleAmountInput?.classList.add("mb-4");
              }
              if (!modelRef.current?.value.trim()) {
                // Set the model error message
                setModelError("Model is required");
                modelValid = false;
                // Highlight the input box with red border for visual error
                modelInput?.classList.add("border-2");
                modelInput?.classList.add("border-red-500");
                modelInput?.classList.remove("mb-4");
              } else {
                // Set the model error message
                setModelError("");
                modelValid = true;
                // Clear error state if model is not empty
                modelInput?.classList.remove("border-2");
                modelInput?.classList.remove("border-red-500");
                modelInput?.classList.add("mb-4");
              }
              if (!colorRef.current?.value.trim()) {
                // Set the color error message
                setColorError("Color is required");
                colorValid = false;
                // Highlight the input box with red border for visual error
                colorInput?.classList.add("border-2");
                colorInput?.classList.add("border-red-500");
                colorInput?.classList.remove("mb-4");
              } else {
                // Clear the color error message and mark it as valid
                setColorError("");
                colorValid = true;
                // Clear error state if color is not empty
                colorInput?.classList.remove("border-2");
                colorInput?.classList.remove("border-red-500");
                colorInput?.classList.add("mb-4");
              }
              if (
                !dateRef.current?.value.trim() ||
                isNaN(Date.parse(dateRef.current?.value.trim()))
              ) {
                // Set the date error message
                setDateError("Date is required and must be a valid date");
                dateValid = false;
                // Highlight the input box with red border for visual error
                dateInput?.classList.add("border-2");
                dateInput?.classList.add("border-red-500");
                dateInput?.classList.remove("mb-4");
              } else {
                // Clear the date error message and mark it as valid
                setDateError("");
                dateValid = true;
                // Clear error state if date is valid
                dateInput?.classList.remove("border-2");
                dateInput?.classList.remove("border-red-500");
                dateInput?.classList.add("mb-4");
              }
              if (
                !vinRef.current?.value.trim() ||
                isNaN(Number(vinRef.current?.value.trim()))
              ) {
                // Set the VIN error message
                setVinError("VIN is required and must be a valid number");
                vinValid = false;
                // Highlight the input box with red border for visual error
                vinInput?.classList.add("border-2");
                vinInput?.classList.add("border-red-500");
                vinInput?.classList.remove("mb-4");
              } else {
                // Clear the VIN error message and mark it as valid
                setVinError("");
                vinValid = true;
                // Clear error state if VIN is valid
                vinInput?.classList.remove("border-2");
                vinInput?.classList.remove("border-red-500");
                vinInput?.classList.add("mb-4");
              }
              if (
                !leaseAmountRef.current?.value.trim() ||
                isNaN(Number(leaseAmountRef.current?.value.trim()))
              ) {
                // Set the leaseAmount error message
                setLeaseAmountError(
                  "Lease Amount is required and must be a valid number"
                );
                leaseAmountValid = false;
                // Highlight the input box with red border for visual error
                leaseAmountInput?.classList.add("border-2");
                leaseAmountInput?.classList.add("border-red-500");
                leaseAmountInput?.classList.remove("mb-4");
              } else {
                // Clear the leaseAmount error message and mark it as valid
                setLeaseAmountError("");
                leaseAmountValid = true;
                // Clear error state if leaseAmount is valid
                leaseAmountInput?.classList.remove("border-2");
                leaseAmountInput?.classList.remove("border-red-500");
                leaseAmountInput?.classList.add("mb-4");
              }
              if (
                !tradeAmountRef.current?.value.trim() ||
                isNaN(Number(tradeAmountRef.current?.value.trim()))
              ) {
                // Set the tradeAmount error message
                setTradeAmountError(
                  "Trade Amount is required and must be a valid number"
                );
                tradeAmountValid = false;
                // Highlight the input box with red border for visual error
                tradeAmountInput?.classList.add("border-2");
                tradeAmountInput?.classList.add("border-red-500");
                tradeAmountInput?.classList.remove("mb-4");
              } else {
                // Clear the tradeAmount error message and mark it as valid
                setTradeAmountError("");
                tradeAmountValid = true;
                // Clear error state if tradeAmount is valid
                tradeAmountInput?.classList.remove("border-2");
                tradeAmountInput?.classList.remove("border-red-500");
                tradeAmountInput?.classList.add("mb-4");
              }
              if (!customerNameRef.current?.value.trim()) {
                // Set the customerName error message
                setCustomerNameError("Customer Name is required");
                customerNameValid = false;
                // Highlight the input box with red border for visual error
                customerNameInput?.classList.add("border-2");
                customerNameInput?.classList.add("border-red-500");
                customerNameInput?.classList.remove("mb-4");
              } else {
                // Clear the customerName error message and mark it as valid
                setCustomerNameError("");
                customerNameValid = true;
                // Clear error state if customerName is not empty
                customerNameInput?.classList.remove("border-2");
                customerNameInput?.classList.remove("border-red-500");
                customerNameInput?.classList.add("mb-4");
              }

              if (
                stockNumberValid &&
                typeValid &&
                makeValid &&
                modelValid &&
                yearValid &&
                costValid &&
                saleAmountValid &&
                colorValid &&
                dateValid &&
                vinValid &&
                leaseAmountValid &&
                tradeAmountValid &&
                customerNameValid
              ) {
                handleDialogSubmit();
              }
            }}
          >
            <DialogHeader>
              <DialogTitle
                className="text-2xl"
                style={{
                  fontFamily: "Roboto",
                  fontWeight: 800,
                  letterSpacing: "1px",
                }}
              >
                Sale:
              </DialogTitle>
            </DialogHeader>
            <hr className="mb-4" />
            <div className="grid grid-cols-2 space-x-35">
              <div className="grid grid-cols-2">
                <div className="pr-3">
                  <Label htmlFor="stockNumber">Stock Number:</Label>
                  <Input
                    id="stockNumberInput"
                    type="number"
                    defaultValue={tempSale?.stockNumber}
                    ref={stockNumberRef}
                    className="w-full mb-4 p-2 border rounded"
                  />
                  {stockNumberError && (
                    <div className="text-red-500 mb-4">{stockNumberError}</div>
                  )}
                </div>
                <div>
                  <Label htmlFor="date">Date:</Label>
                  <Input
                    id="dateInput"
                    type="text"
                    defaultValue={tempSale?.dateStr}
                    ref={dateRef}
                    className="w-full mb-4 p-2 border rounded"
                  />
                  {dateError && (
                    <div className="text-red-500 mb-4">{dateError}</div>
                  )}
                </div>
                <div className="pr-3">
                  <Label htmlFor="saleAmount">Sale Amount:</Label>
                  <Input
                    id="saleAmountInput"
                    type="number"
                    defaultValue={tempSale?.saleAmount}
                    ref={saleAmountRef}
                    className="w-full mb-4 p-2 border rounded"
                  />
                  {saleAmountError && (
                    <div className="text-red-500 mb-4">{saleAmountError}</div>
                  )}
                </div>
                <div>
                  <Label htmlFor="cost">Cost:</Label>
                  <Input
                    id="costInput"
                    type="number"
                    defaultValue={tempSale?.cost}
                    ref={costRef}
                    className="w-full mb-4 p-2 border rounded"
                  />
                  {costError && (
                    <div className="text-red-500 mb-4">{costError}</div>
                  )}
                </div>
                <div className="pr-3">
                  <Label htmlFor="leaseAmount">Lease Amount:</Label>
                  <Input
                    id="leaseAmountInput"
                    type="number"
                    defaultValue={tempSale?.leaseAmount}
                    ref={leaseAmountRef}
                    className="w-full mb-4 p-2 border rounded"
                  />
                  {leaseAmountError && (
                    <div className="text-red-500 mb-4">{leaseAmountError}</div>
                  )}
                </div>
                <div>
                  <Label htmlFor="tradeAmount">Trade Amount:</Label>
                  <Input
                    id="tradeAmountInput"
                    type="number"
                    defaultValue={tempSale?.tradeAmount}
                    ref={tradeAmountRef}
                    className="w-full mb-4 p-2 border rounded"
                  />
                  {tradeAmountError && (
                    <div className="text-red-500 mb-4">{tradeAmountError}</div>
                  )}
                </div>
                <div>
                  <Label htmlFor="customerName">Customer Name:</Label>
                  <Input
                    id="customerNameInput"
                    type="text"
                    defaultValue={tempSale?.customerName}
                    ref={customerNameRef}
                    maxLength={100}
                    className="w-full mb-4 p-2 border rounded"
                  />
                  {customerNameError && (
                    <div className="text-red-500 mb-4">{customerNameError}</div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-3 space-x-3 max-h-3">
                <div className="pl-3">
                  <Label htmlFor="type">Type:</Label>
                  <Input
                    id="typeInput"
                    type="text"
                    defaultValue={tempSale?.type}
                    ref={typeRef}
                    maxLength={100}
                    className="w-full mb-4 p-2 border rounded"
                  />
                  {typeError && (
                    <div className="text-red-500 mb-4">{typeError}</div>
                  )}
                </div>
                <div>
                  <Label htmlFor="make">Make:</Label>
                  <Input
                    id="makeInput"
                    type="text"
                    defaultValue={tempSale?.make}
                    ref={makeRef}
                    maxLength={100}
                    className="w-full mb-4 p-2 border rounded"
                  />
                  {makeError && (
                    <div className="text-red-500 mb-4">{makeError}</div>
                  )}
                </div>
                <div>
                  <Label htmlFor="model">Model:</Label>
                  <Input
                    id="modelInput"
                    type="text"
                    defaultValue={tempSale?.model}
                    ref={modelRef}
                    maxLength={100}
                    className="w-full mb-4 p-2 border rounded"
                  />
                  {modelError && (
                    <div className="text-red-500 mb-4">{modelError}</div>
                  )}
                </div>
                <div>
                  <Label htmlFor="year">Year:</Label>
                  <Input
                    id="yearInput"
                    type="number"
                    defaultValue={tempSale?.year}
                    ref={yearRef}
                    className="w-full mb-4 p-2 border rounded"
                  />
                  {yearError && (
                    <div className="text-red-500 mb-4">{yearError}</div>
                  )}
                </div>
                <div>
                  <Label htmlFor="color">Color:</Label>
                  <Input
                    id="colorInput"
                    type="text"
                    defaultValue={tempSale?.color}
                    ref={colorRef}
                    maxLength={100}
                    className="w-full mb-4 p-2 border rounded"
                  />
                  {colorError && (
                    <div className="text-red-500 mb-4">{colorError}</div>
                  )}
                </div>
                <div>
                  <Label htmlFor="vin">VIN:</Label>
                  <Input
                    id="vinInput"
                    type="text"
                    defaultValue={tempSale?.vin}
                    ref={vinRef}
                    maxLength={17}
                    className="w-full mb-4 p-2 border rounded"
                  />
                  {vinError && (
                    <div className="text-red-500 mb-4">{vinError}</div>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                size={"sm"}
                className="bg-green-600 text-xs hover:bg-green-800 mt-5 mb-0"
                style={{
                  fontFamily: "Roboto",
                  fontWeight: 800,
                  letterSpacing: "1px",
                }}
              >
                Submit
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SalesDialog;
