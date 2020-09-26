export default {
  data() {
    return {
      noTickets: false,
      tableHeads: ['Name', 'Ticket ID', 'Agent', 'Type', 'Amount'],
      tableBody: [
        {
          name: 'AbdulGafar Olamide Ajao',
          ticketId: '7t5y8e5uhi47',
          agent: 'Item 7',
          type: 'VVIP',
          amount: '10000 x 2',
        },
        {
          name: 'Ozenua Tobi',
          ticketId: '7t5y857h8h47',
          agent: 'Item 7',
          type: 'Regular',
          amount: '2500 x 4',
        },
        {
          name: 'Geeky Adams',
          ticketId: '74y5gd7hn9ud',
          agent: 'Kokobar',
          type: 'VIP',
          amount: '5000 x 2',
        },
        {
          name: 'Mudia Imasuen',
          ticketId: 'nnd47b3983h4',
          agent: 'Item 7',
          type: 'Regular',
          amount: '2500 x 3',
        },
      ],
    }
  },
}
