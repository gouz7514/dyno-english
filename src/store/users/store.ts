import { createSlice } from '@reduxjs/toolkit'

import { UserProps } from '@/types/types'

const initialState: UserProps = {
  name: '',
  phone: '',
  kid: {
    name: '',
    birth: ''
  }
}

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUserName(state, action) {
      state.name = action.payload
    },
    setUserPhone(state, action) {
      state.phone = action.payload
    },
    setKidName(state, action) {
      state.kid.name = action.payload
    },
    setKidBirth(state, action) {
      state.kid.birth = action.payload
    }
  }
})

export const { setUserName, setUserPhone, setKidName, setKidBirth } = userSlice.actions
export default userSlice.reducer