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

    // Chart configuration
    const ctx = document.getElementById('chart') ? document.getElementById('chart').getContext('2d') : null;
    if (ctx) {
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

    const partnerTable = document.getElementById('partnerTable');
    const partnerTableBody = document.getElementById('partnerTableBody');
    const noPartnersMessage = document.getElementById('noPartnersMessage');

    // Handle form submission for creating a new partner
    document.getElementById('createPartnerBtn').addEventListener('click', () => {
        const partnerID = document.getElementById('partnerID').value;
        const partnerPassword = document.getElementById('partnerPassword').value;
        const partnerRole = document.getElementById('partnerRole').value;
        const featureSelect = document.getElementById('featureSelect');
        const selectedFeatures = Array.from(featureSelect.selectedOptions).map(option => option.value);

        // Perform validation and creation logic here
        if (partnerID && partnerPassword && partnerRole) {
            console.log('Creating new partner:', {
                partnerID,
                partnerPassword,
                partnerRole,
                selectedFeatures
            });

            // Add the new partner to the table
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${partnerID}</td>
                <td class="members">--</td>
                <td class="deposits">--</td>
                <td class="withdrawals">--</td>
                <td class="activemembers">--</td>
            `;
            partnerTableBody.appendChild(newRow);

            // Show the table if it's currently hidden
            if (partnerTable.style.display === 'none') {
                partnerTable.style.display = 'table';
                noPartnersMessage.style.display = 'none';
            }

            // Reset the form
            document.getElementById('createPartnerForm').reset();
        } else {
            alert('Please fill all fields.');
        }
    });

    // Example code to populate partner list (replace with real data fetching)
    const partnerData = []; // Start with an empty array
    if (partnerData.length === 0) {
        partnerTable.style.display = 'none';
        noPartnersMessage.style.display = 'block';
    } else {
        partnerTable.style.display = 'table';
        noPartnersMessage.style.display = 'none';
        partnerData.forEach(partner => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${partner.id}</td><td>${partner.members}</td><td>${partner.deposits}</td><td>${partner.withdrawals}</td><td>${partner.active}</td>`;
            partnerTableBody.appendChild(row);
        });
    }
});
