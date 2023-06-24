import React from "react";
import {render, screen, waitFor, fireEvent} from  "@testing-library/react"
import AppFunctional from "./AppFunctional";
import '@testing-library/jest-dom/extend-expect'

test('sanity', () => {
  expect(true).toBe(true)
})

test("companent doğru render ediliyor", () => {
 render (<AppFunctional/>)
})

test("ilerlenince koordinatlar doğru gösteriliyor", () => {
  render (<AppFunctional/>)

   const steps = screen.getByText(/koordinatlar/i)

   expect(steps).toHaveTextContent("(2,2)")
 })

 test("yukarı basınca koordinatları doğru gösteriyor", () => {
  render (<AppFunctional/>)

   const up = screen.getByText(/koordinatlar/i)
   const button = screen.getByText("YUKARI")

   fireEvent.click(button)

   expect(up).toHaveTextContent("(2,1)")
 })

 test("2 kez yukarı basınca uyarı mesajı alınıyor", () => {
  render (<AppFunctional/>)

   const message = document.querySelector("#message")
   const button = screen.getByText("YUKARI")

   fireEvent.click(button)
   fireEvent.click(button)

   expect(message).toHaveTextContent("Yukarıya gidemezsiniz")
 })

 test("hatalı email girince hata mesajı alınıyor", async() => {
  render (<AppFunctional/>)

  const emailInput = document.querySelector("#email")
  const submitButton = document.querySelector("#submit")

  fireEvent.change(emailInput, {target: {value:'sss@foo.baz'}});
  fireEvent.click(submitButton)

  await waitFor(()=>{
    const message = screen.queryByText(/ouch/i);
    expect(message).toBeInTheDocument;
  }) 
 })

 test("doğru email girince başarı mesajı alınıyor", async() => {
  render (<AppFunctional/>)

  const emailInput = document.querySelector("#email")
  const submitButton = document.querySelector("#submit")

  fireEvent.change(emailInput, {target: {value:'sss@gmail.com'}});
  fireEvent.click(submitButton)

  await waitFor(()=>{
    const message = screen.queryByText(/win/i)
    expect(message).toBeInTheDocument;
  }) 
 })