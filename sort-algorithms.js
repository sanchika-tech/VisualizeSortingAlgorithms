"use strict";
class sortAlgorithms {
    constructor(time) {
        this.list = document.querySelectorAll(".cell");
        this.size = this.list.length;
        this.time = time;
        this.help = new Helper(this.time, this.list);
    }

    // BUBBLE SORT
    BubbleSort = async () => {

        let comparisonsCount = 0;
        let swapsCount = 0;
        let startTime = performance.now(); // Start time for timeElapsed calculation

        for (let i = 0; i < this.size - 1; ++i) {
            for (let j = 0; j < this.size - i - 1; ++j) {
                await this.help.mark(j);
                await this.help.mark(j + 1);
                comparisonsCount++; // Increment comparisonsCount for each comparison
                if (await this.help.compare(j, j + 1)) {
                    await this.help.swap(j, j + 1);
                    swapsCount++; // Increment swapsCount for each swap
                }
                await this.help.unmark(j);
                await this.help.unmark(j + 1);
            }
            this.list[this.size - i - 1].setAttribute("class", "cell done");
        }
        this.list[0].setAttribute("class", "cell done");
        let endTime = performance.now(); // End time for timeElapsed calculation
        let timeElapsed = (endTime - startTime) / 1000; // Time elapsed in seconds

        // Update statistics display
        updateStatistics(comparisonsCount, swapsCount, timeElapsed);
    }


    // INSERTION SORT
    InsertionSort = async () => {
        let comparisonsCount = 0;
        let swapsCount = 0;
        let startTime = performance.now();
        for (let i = 0; i < this.size - 1; ++i) {
            let j = i;
            while (j >= 0 && await this.help.compare(j, j + 1)) {
                await this.help.mark(j);
                await this.help.mark(j + 1);
                await this.help.pause();
                await this.help.swap(j, j + 1);
                await this.help.unmark(j);
                await this.help.unmark(j + 1);
                j -= 1;
                comparisonsCount++;
                swapsCount++;
            }
        }
        for (let counter = 0; counter < this.size; ++counter) {
            this.list[counter].setAttribute("class", "cell done");
        }
        let endTime = performance.now();
        let timeElapsed = (endTime - startTime) / 1000;

        // Update statistics
        updateStatistics(comparisonsCount, swapsCount, timeElapsed);
    }

    // SELECTION SORT
    SelectionSort = async () => {
        let comparisonsCount = 0;
        let swapsCount = 0;
        let startTime = performance.now();

        for (let i = 0; i < this.size; ++i) {
            let minIndex = i;
            for (let j = i; j < this.size; ++j) {
                await this.help.markSpl(minIndex);
                await this.help.mark(j);
                if (await this.help.compare(minIndex, j)) {
                    await this.help.unmark(minIndex);
                    minIndex = j;
                }
                await this.help.unmark(j);
                await this.help.markSpl(minIndex);
                comparisonsCount++;
            }
            await this.help.mark(minIndex);
            await this.help.mark(i);
            await this.help.pause();
            await this.help.swap(minIndex, i);
            await this.help.unmark(minIndex);
            this.list[i].setAttribute("class", "cell done");
            swapsCount++;
        }
        let endTime = performance.now();
        let timeElapsed = (endTime - startTime) / 1000;

        // Update statistics
        updateStatistics(comparisonsCount, swapsCount, timeElapsed);
    }

    // MERGE SORT
    MergeSort = async () => {
        this.comparisonsCount = 0; // Initialize comparisons count
        this.swapsCount = 0; // Initialize swaps count
        const startTime = performance.now(); // Record start time
        await this.MergeDivider(0, this.size - 1);
        for (let c = 0; c < this.size; ++c) {
            this.list[c].setAttribute("class", "cell done");
        }
        const endTime = performance.now(); // Record end time
        const timeElapsed = (endTime - startTime) / 1000; // Calculate time elapsed
        updateStatistics(this.comparisonsCount, this.swapsCount, timeElapsed); // Update statistics after sorting
    }

    MergeDivider = async (start, end) => {
        if (start < end) {
            let mid = start + Math.floor((end - start) / 2);
            await this.MergeDivider(start, mid);
            await this.MergeDivider(mid + 1, end);
            await this.Merge(start, mid, end);
        }
    }

    Merge = async (start, mid, end) => {
        let newList = new Array();
        let frontcounter = start;
        let midcounter = mid + 1;

        while (frontcounter <= mid && midcounter <= end) {
            let fvalue = Number(this.list[frontcounter].getAttribute("value"));
            let svalue = Number(this.list[midcounter].getAttribute("value"));
            if (fvalue >= svalue) {
                newList.push(svalue);
                ++midcounter;
            } else {
                newList.push(fvalue);
                ++frontcounter;
            }
            this.comparisonsCount++; // Increment comparisons count
        }
        while (frontcounter <= mid) {
            newList.push(Number(this.list[frontcounter].getAttribute("value")));
            ++frontcounter;
        }
        while (midcounter <= end) {
            newList.push(Number(this.list[midcounter].getAttribute("value")));
            ++midcounter;
        }

        for (let c = start; c <= end; ++c) {
            this.list[c].setAttribute("class", "cell current");
        }
        for (let c = start, point = 0; c <= end && point < newList.length; ++c, ++point) {
            await this.help.pause();
            let newValue = newList[point];
            let barHeight = `${3.5 * newValue}px`;
            this.list[c].setAttribute("value", newValue);
            this.list[c].style.height = barHeight;

            // Update value label
            let valueLabel = this.list[c].querySelector('.value-label');
            if (valueLabel) {
                valueLabel.textContent = newValue;
            }
            this.swapsCount++; // Increment swaps count
        }
        for (let c = start; c <= end; ++c) {
            this.list[c].setAttribute("class", "cell");
        }
    }

    // QUICK SORT
    QuickSort = async () => {
        this.comparisonsCount = 0; // Initialize comparisons count
        this.swapsCount = 0; // Initialize swaps count
        const startTime = performance.now(); // Record start time
        await this.QuickDivider(0, this.size - 1);
        for (let c = 0; c < this.size; ++c) {
            this.list[c].setAttribute("class", "cell done");
        }
        const endTime = performance.now(); // Record end time
        const timeElapsed = (endTime - startTime) / 1000; // Calculate time elapsed
        updateStatistics(this.comparisonsCount, this.swapsCount, timeElapsed); // Update statistics after sorting
    }

    QuickDivider = async (start, end) => {
        if (start < end) {
            let pivot = await this.Partition(start, end);
            await this.QuickDivider(start, pivot - 1);
            await this.QuickDivider(pivot + 1, end);
        }
    }

    Partition = async (start, end) => {
        let pivot = Number(this.list[end].getAttribute("value")); // Convert pivot value to a number
        let prev_index = start - 1;

        await this.help.markSpl(end);
        for (let c = start; c < end; ++c) {
            let currValue = Number(this.list[c].getAttribute("value")); // Convert current value to a number
            await this.help.mark(c);
            this.comparisonsCount++; // Increment comparisons count
            if (currValue < pivot) {
                prev_index += 1;
                await this.help.mark(prev_index);
                await this.help.swap(c, prev_index);
                await this.help.unmark(prev_index);
                this.swapsCount++; // Increment swaps count
            }
            await this.help.unmark(c);
        }
        await this.help.swap(prev_index + 1, end);
        await this.help.unmark(end);
        this.swapsCount++; // Increment swaps count
        return prev_index + 1;
    }
};
