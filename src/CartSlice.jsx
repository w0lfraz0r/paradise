import React from "react"
import { createSlice } from "@reduxjs/toolkit"

export const CartSlice = createSlice({
	name: "cart",
	initialState: {
		items: [], // Array of items in the cart
		totalQuantity: 0, // Total quantity of items
	},
	reducers: {
		addItem: (state, action) => {
			const item = action.payload
			const existingItem = state.items.find((i) => i.name === item.name)

			if (existingItem) {
				existingItem.quantity += 1
			} else {
				state.items.push({ ...item, quantity: 1 })
			}

			state.totalQuantity += 1 // Increment total quantity
		},
		removeItem: (state, action) => {
			const itemName = action.payload
			const existingItem = state.items.find((i) => i.name === itemName)

			if (existingItem) {
				state.totalQuantity -= existingItem.quantity // Decrement total quantity
				state.items = state.items.filter((i) => i.name !== itemName)
			}
		},
		updateQuantity: (state, action) => {
			const { name, quantity } = action.payload
			const item = state.items.find((i) => i.name === name)

			if (item) {
				state.totalQuantity += quantity - item.quantity // Update total quantity
				item.quantity = quantity
			}
		},
	},
})

export const { addItem, removeItem, updateQuantity } = CartSlice.actions

export default CartSlice.reducer
