import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feed-consumption',
  templateUrl: './feed-consumption.component.html',
  styleUrls: ['./feed-consumption.component.scss']
})
export class FeedConsumptionComponent implements OnInit {
  feedConsumption = [
    { date: '2025-07-14', batch: 'Batch A', feedType: 'Corn', quantity: 120, consumedBy: 'Cattle' },
    { date: '2025-07-13', batch: 'Batch B', feedType: 'Soybean', quantity: 90, consumedBy: 'Sheep' },
    { date: '2025-07-12', batch: 'Batch C', feedType: 'Hay', quantity: 150, consumedBy: 'Goats' },
    { date: '2025-07-11', batch: 'Batch D', feedType: 'Silage', quantity: 200, consumedBy: 'Cattle' },
    { date: '2025-07-10', batch: 'Batch E', feedType: 'Grain Mix', quantity: 80, consumedBy: 'Poultry' }
  ];

  constructor() {}

  ngOnInit(): void {}
}
