
document.addEventListener('DOMContentLoaded', function() {
  // Initialize glucose chart
  const glucoseCtx = document.getElementById('glucoseChart').getContext('2d');
  
  // Mock data for glucose readings
  const glucoseData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Glucose Readings',
        data: [130, 142, 123, 158, 130, 118, 128],
        backgroundColor: 'rgba(46, 204, 113, 0.2)',
        borderColor: 'rgba(46, 204, 113, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(46, 204, 113, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(46, 204, 113, 1)',
        pointRadius: 4,
        tension: 0.4
      }
    ]
  };
  
  // Create chart
  const glucoseChart = new Chart(glucoseCtx, {
    type: 'line',
    data: glucoseData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: false,
          min: 70,
          max: 200,
          ticks: {
            stepSize: 30
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          titleColor: '#333',
          bodyColor: '#333',
          borderColor: 'rgba(46, 204, 113, 0.5)',
          borderWidth: 1,
          callbacks: {
            title: function(tooltipItems) {
              return `${tooltipItems[0].label}, May ${10 + tooltipItems[0].dataIndex}, 2025`;
            },
            label: function(context) {
              return `Glucose: ${context.parsed.y} mg/dL`;
            }
          }
        },
        annotation: {
          annotations: {
            highLine: {
              type: 'line',
              yMin: 180,
              yMax: 180,
              borderColor: 'rgba(231, 76, 60, 0.6)',
              borderWidth: 1,
              borderDash: [5, 5]
            },
            lowLine: {
              type: 'line',
              yMin: 80,
              yMax: 80,
              borderColor: 'rgba(231, 76, 60, 0.6)',
              borderWidth: 1,
              borderDash: [5, 5]
            }
          }
        }
      }
    }
  });
  
  // Time range buttons functionality
  const timeButtons = document.querySelectorAll('.time-btn');
  
  timeButtons.forEach(button => {
    button.addEventListener('click', function() {
      timeButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      const range = parseInt(this.dataset.range);
      
      // In a real app, we would fetch data based on the range
      // For this demo, we'll just update the chart with random data
      const newData = [];
      for (let i = 0; i < range; i++) {
        newData.push(Math.floor(Math.random() * (180 - 90) + 90));
      }
      
      // Update labels based on range
      const newLabels = [];
      for (let i = 0; i < range; i++) {
        const date = new Date();
        date.setDate(date.getDate() - (range - 1 - i));
        newLabels.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
      }
      
      glucoseChart.data.labels = newLabels;
      glucoseChart.data.datasets[0].data = newData;
      glucoseChart.update();
    });
  });
  
  // Reminder button functionality
  const addReminderBtn = document.querySelector('.add-reminder-btn');
  
  if (addReminderBtn) {
    addReminderBtn.addEventListener('click', function() {
      alert('Add reminder feature will be implemented here.');
    });
  }
});
