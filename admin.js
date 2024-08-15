document.addEventListener('DOMContentLoaded', () => {
    // Initially hide all submenus
    document.querySelectorAll('.submenu').forEach(submenu => {
        submenu.style.maxHeight = null;
    });

    // Toggle submenu visibility on click
    document.querySelectorAll('.has-submenu > a').forEach(item => {
        item.addEventListener('click', event => {
            event.preventDefault();
            const submenu = item.nextElementSibling;

            // Close all other submenus
            document.querySelectorAll('.submenu').forEach(menu => {
                if (menu !== submenu) {
                    menu.style.maxHeight = null;
                    menu.parentElement.classList.remove('active');
                }
            });

            // Toggle the clicked submenu
            if (submenu.style.maxHeight) {
                submenu.style.maxHeight = null;
                item.parentElement.classList.remove('active');
            } else {
                submenu.style.maxHeight = submenu.scrollHeight + 'px';
                item.parentElement.classList.add('active');
            }
        });
    });

    // Highlight the active link and keep the submenu open
    const allLinks = document.querySelectorAll('.sidebar a');
    allLinks.forEach(link => {
        link.addEventListener('click', function () {
            // Remove active class from all links
            allLinks.forEach(link => link.classList.remove('active'));
            // Add active class to the clicked link
            this.classList.add('active');

            // Ensure the submenu containing the active link is open
            let parent = this.parentElement.parentElement;
            while (parent.classList.contains('submenu')) {
                parent.style.maxHeight = parent.scrollHeight + 'px';
                parent.parentElement.classList.add('active');
                parent = parent.parentElement.parentElement;
            }
        });
    });

    // Preserve the state on page load
    const currentPage = window.location.pathname.split('/').pop();
    allLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');

            let parent = link.parentElement.parentElement;
            while (parent.classList.contains('submenu')) {
                parent.style.maxHeight = parent.scrollHeight + 'px';
                parent.parentElement.classList.add('active');
                parent = parent.parentElement.parentElement;
            }
        }
    });

    // Time and date display
    function updateTime() {
        const now = new Date();
        const time = now.toTimeString().split(' ')[0];
        const date = now.toDateString();
        document.getElementById('timeDate').textContent = `${date} ${time}`;
    }

    setInterval(updateTime, 1000);
    updateTime();

    // Fetch data from the API and update UI
    async function fetchData() {
        try {
            const transactionsResponse = await fetch('/api/transactions');
            const transactionsData = await transactionsResponse.json();
            updateTransactionsTable(transactionsData);

            const statsResponse = await fetch('/api/stats');
            const statsData = await statsResponse.json();
            updateStats(statsData);

            // Similarly, fetch other data as needed
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Update Transactions Table
    function updateTransactionsTable(data) {
        // Example: update table cells with dynamic data
        const transactionRows = document.querySelectorAll('.transactions tbody tr');
        transactionRows.forEach((row, index) => {
            const cells = row.querySelectorAll('td');
            cells[1].textContent = data[index].amount || '--';
            cells[2].textContent = data[index].times || '--';
            cells[3].textContent = data[index].people || '--';
        });
    }

    // Update Stats
    function updateStats(data) {
        // Example: update stats
        const statItems = document.querySelectorAll('.stats .stat-item');
        statItems[0].querySelector('.amount').textContent = `₹${data.deposits}`;
        statItems[1].querySelector('.amount').textContent = `₹${data.withdrawals}`;
        statItems[2].querySelector('.amount').textContent = data.members;
        statItems[3].querySelector('.amount').textContent = data.pendingDeposits;
        statItems[4].querySelector('.amount').textContent = data.pendingWithdrawals;
    }

    // Fetch initial data
    fetchData();

    // Chart configuration
    const chartElement = document.getElementById('chart');
    if (chartElement) {
        const ctx = chartElement.getContext('2d');
        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                datasets: [
                    {
                        label: 'Members',
                        data: [10, 50, 25, 70, 60, 90, 100],
                        borderColor: '#007bff',
                        fill: false,
                        tension: 0.4
                    },
                    {
                        label: 'Withdrawals',
                        data: [30, 20, 40, 60, 80, 70, 90],
                        borderColor: '#ff0015',
                        fill: false,
                        tension: 0.4
                    },
                    {
                        label: 'Deposits',
                        data: [50, 60, 70, 90, 80, 110, 130],
                        borderColor: '#9fff00',
                        fill: false,
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Month'
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Amount'
                        }
                    }
                }
            }
        });
    }
});
