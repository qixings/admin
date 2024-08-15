document.addEventListener('DOMContentLoaded', () => {
    const partnerTable = document.getElementById('partnerTable');
    const partnerTableBody = document.getElementById('partnerTableBody');
    const noPartnersMessage = document.getElementById('noPartnersMessage');

    const partnerDetailsModal = document.getElementById('partnerDetailsModal');
    const closeModal = document.querySelector('.modal .close');

    // Store features with their details
    const features = {};

    // Show modal with partner details
    function showPartnerDetails(partner) {
        document.getElementById('modalPartnerID').textContent = partner.partnerID;
        document.getElementById('modalPartnerPassword').textContent = partner.partnerPassword;
        document.getElementById('modalPartnerRole').textContent = partner.partnerRole;
        document.getElementById('modalMembers').textContent = partner.members;
        document.getElementById('modalDeposits').textContent = partner.deposits;
        document.getElementById('modalWithdrawals').textContent = partner.withdrawals;
        document.getElementById('modalActiveMembers').textContent = partner.activeMembers;
        document.getElementById('modalAssignedRoles').textContent = partner.assignedRoles.join(', ');
        document.getElementById('modalAssignedFeatures').textContent = partner.assignedFeatures.map(feature => `${feature.name}: ${feature.details.join(', ')}`).join('; ');

        partnerDetailsModal.style.display = 'block';
    }

    // Close modal
    closeModal.addEventListener('click', () => {
        partnerDetailsModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === partnerDetailsModal) {
            partnerDetailsModal.style.display = 'none';
        }
    });

    // Handle form submission for creating a new partner
    document.getElementById('createPartnerBtn').addEventListener('click', () => {
        const partnerID = document.getElementById('partnerID').value.trim();
        const partnerPassword = document.getElementById('partnerPassword').value.trim();
        const partnerRole = document.getElementById('partnerRole').value.trim();

        const featureSelect = document.getElementById('featureSelect');
        const selectedFeatures = Array.from(featureSelect.selectedOptions).map(option => ({
            name: option.textContent,
            details: features[option.value] || []  // Retrieve the details of the selected features
        }));

        // Perform validation and creation logic here
        if (partnerID && partnerPassword && partnerRole) {
            const newPartner = {
                partnerID,
                partnerPassword,
                partnerRole,
                members: '--',
                deposits: '--',
                withdrawals: '--',
                activeMembers: '--',
                assignedRoles: [partnerRole], // Example: You can replace this with actual assigned roles logic
                assignedFeatures: selectedFeatures
            };

            console.log('Creating new partner:', newPartner);

            // Add the new partner to the table
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td class="partner-id">${partnerID}</td>
                <td class="members">--</td>
                <td class="deposits">--</td>
                <td class="withdrawals">--</td>
                <td class="activemembers">--</td>
            `;
            partnerTableBody.appendChild(newRow);

            // Add click event to show details
            newRow.querySelector('.partner-id').addEventListener('click', () => showPartnerDetails(newPartner));

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

    // Handle feature creation
    document.getElementById('createFeatureBtn').addEventListener('click', () => {
        const featureName = document.getElementById('featureName').value.trim();
        const selectedDetails = Array.from(document.querySelectorAll('.feature-list input[type="checkbox"]:checked'))
            .map(checkbox => checkbox.parentElement.textContent.trim());

        if (featureName && selectedDetails.length > 0) {
            const featureKey = featureName.toLowerCase().replace(/\s+/g, '_');
            features[featureKey] = selectedDetails; // Store feature details
            const featureSelect = document.getElementById('featureSelect');
            const existingOptions = Array.from(featureSelect.options).map(option => option.value);

            // Check for unique feature name
            if (!existingOptions.includes(featureKey)) {
                // Create a new feature option
                const newFeatureOption = new Option(featureName, featureKey);
                featureSelect.appendChild(newFeatureOption);

                // Clear the form inputs
                document.getElementById('featureName').value = '';
                document.querySelectorAll('.feature-list input[type="checkbox"]').forEach(checkbox => {
                    checkbox.checked = false;
                });

                alert('Feature created successfully!');
            } else {
                alert('Feature name already exists. Please choose a different name.');
            }
        } else {
            alert('Please provide a feature name and select features.');
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
            row.innerHTML = `<td class="partner-id">${partner.partnerID}</td><td>${partner.members}</td><td>${partner.deposits}</td><td>${partner.withdrawals}</td><td>${partner.active}</td>`;
            partnerTableBody.appendChild(row);

            // Add click event to show details
            row.querySelector('.partner-id').addEventListener('click', () => showPartnerDetails(partner));
        });
    }

    // Handle displaying -- for fields with no data in the info section
    const infoSectionColorMapping = {
        data1: '#007bff',  // Color for data1
        data2: '#9fff00',  // Color for data2
        data3: '#ff0015'   // Color for data3
    };

    document.querySelectorAll('.data1, .data2, .data3').forEach(field => {
        if (field.textContent === '--') {
            const className = field.className;
            field.style.color = infoSectionColorMapping[className] || '#ffffff';
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const activityTableBody = document.getElementById('activityTableBody');

    // Example activity data
    const activityData = [
        { partnerID: 'P001', loginTime: '2024-08-01 09:00', logoutTime: '2024-08-01 17:00', status: 'Logged Out' },
        { partnerID: 'P002', loginTime: '2024-08-01 10:00', logoutTime: '2024-08-01 18:00', status: 'Logged Out' },
        { partnerID: 'P003', loginTime: '2024-08-09 08:30', logoutTime: '', status: 'Logged In' }
    ];

    // Populate the activity log table
    activityData.forEach(activity => {
        const row = document.createElement('tr');

        const loginClass = 'login-time';
        const logoutClass = activity.logoutTime ? 'logout-time' : 'logout-time pending';
        const statusClass = activity.status === 'Logged In' ? 'status-logged-in' : 'status-logged-out';

        row.innerHTML = `
            <td>${activity.partnerID}</td>
            <td class="${loginClass}">${activity.loginTime}</td>
            <td class="${logoutClass}">${activity.logoutTime || 'Pending'}</td>
            <td class="${statusClass}">${activity.status}</td>
        `;
        activityTableBody.appendChild(row);
    });
});
