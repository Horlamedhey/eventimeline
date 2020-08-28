export default {
  eventTitle: {
    required: 'Please enter event title',
    minLength: 'Event title needs to be at least 3 characters long',
  },
  eventDescription: {
    required: 'Please enter event description',
    minLength: 'Event description needs to be at least 20 characters long',
  },
  eventProvisions: {
    required: 'Please enter event provision',
    minLength: 'Event provision needs to be at least 2 characters long',
  },
  eventDate: {
    required: 'Please select event date',
  },
  organiserName: {
    required: 'Please enter your name',
    minLength: 'Event provision needs to be at least 2 characters long',
  },
  email: {
    required: 'Please enter your email',
    email: 'Your email is not in the correct format',
  },
  phone: {
    required: 'Please enter your phone number',
    isPhone: 'Please enter a valid phone number',
  },
  adminPass: {
    required: 'Please enter a password',
    minLength: 'Password needs to be at least 8 character long',
    containsUppercase:
      'Password needs to contain at least one upper case character',
    containsLowercase:
      'Password needs to contain at least one lower case character',
    containsNumber: 'Password needs to contain at least one number',
    containsSpecial:
      'Password needs to contain at least one special character. !@#$%&*()',
  },
  ticketType: {
    required: 'Please enter a ticket type',
    minLength: 'Ticket type needs to be at least 3 characters long',
  },
  maxAvailable: {
    required: 'Please enter the number of available tickets',
    integer: 'Please input a valid number',
    minValue: 'Minimum value is 5',
  },
  ticketPrice: {
    required: 'Please enter ticket price',
    validPrice: 'Please input a valid price',
  },
  accountName: {
    required: 'Please check your account number or selected bank',
    alpha: 'Account name can only contain alphabets',
    minLength: 'Event provision needs to be at least 2 characters long',
  },
  accountNumber: {
    required: 'Please enter your bank account number',
    numeric: 'Account number can only contain numbers',
    minLength: 'Account number needs to be 10 characters long',
    maxLength: 'Account number needs to be 10 characters long',
  },
  bankName: {
    required: 'Please select your bank',
  },
  bvn: {
    required: 'Please enter your bank verification number',
    numeric: 'Bank Verification number can only contain numbers',
    minLength: 'Bank Verification number needs to be 11 characters long',
    maxLength: 'Bank Verification number needs to be 11 characters long',
  },
}
