import firebase from 'firebase/compat/app'

type Booking = {
    id: string
    userId: string
    name: string
    email: string
    phone: string

    date: string
    time: string
    dateTime: firebase.firestore.Timestamp
    status: "confirmed" | "unconfirmed" | "completed"
    createdAt: string
}

export default Booking
