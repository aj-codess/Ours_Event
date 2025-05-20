import Event from "./../models/eventModel.js";

class manager {
    constructor() {
      this.queues = new Map();
    }
  
    _initQueue(id) {
      if (!this.queues.has(id)) {
        this.queues.set(id, {
          queue: [],
          totalPayload,
          processed: 0,
          failed: 0,
          queueDelay:300,
          isProcessing: false,
        });
      }
    }
  
    enqueue(id, item) {
      this._initQueue(id);
  
      const q = this.queues.get(id);
  
      try {
        if (!item) {
          q.failed++;
          return false;
        }
  
        q.queue.push(item);
        q.processed++;
        return true;
      } catch (error) {
        q.failed++;
        return false;
      }
    }
  
    dequeue(id) {
  
      if (this.queues.get(id).length === 0) {
        return "Queue is empty";
      }
  
      return queue.shift();
    }

  
    isEmpty(id) {
      this._initQueue(id);
      return this.queues.get(id).queue.length === 0;
    }
  
    size(id) {
      this._initQueue(id);
      return this.queues.get(id).queue.length;
    }
  
    peek(id) {
      this._initQueue(id);
  
      const q = this.queues.get(id);
  
      if (q.queue.length === 0) {
        return "Queue is empty";
      }
      return q.queue[0];
    }
  
    clear(id) {
      this._initQueue(id);
      this.queues.get(id).queue = [];
      return true;
    }
  
    updateFailed(id) {
      this._initQueue(id);
      this.queues.get(id).failed++;
    }
  
    getStats(id) {
      this._initQueue(id);
      const { processed, failed ,totalPayload} = this.queues.get(id);
      return { processed, failed,totalPayload };
    }


    async processor(id){

        if (this.queues.get(id).isProcessing) {
            return;
        }

        const timerInterval=setInterval(async () => {

            if(this.queues.get(id).queue.length===0){
                this.queues.get(id).isProcessing=false;
                clearInterval(timerInterval);
                return;
            };

            this.queues.get(id).isProcessing=true;

            try{

                await Event.findOneAndUpdate(
                    {eventId:id},
                    {$push:{album:this.dequeue(id)}}
                );

                console.log(`Successfully processed an item for event ${id}`);

            } catch(error){
                clearInterval(timerInterval);
                console.log("Error in processing the queue and Writing to Db - ",error.message);
                return;
            };

        }, this.queues.get(id).queueDelay);
    }


    processQueue(id){
        try{
            const queueObj = this.queues.get(id);

            if (!queueObj) {
                console.error(`No queue found for ID: ${id}`);
                return;
            }
    
            if (queueObj.queue.length === 0) {
                queueObj.isProcessing = false;
                return;
            }
    
            if (!queueObj.isProcessing) {
                queueObj.isProcessing = true;
                this.processor(id);
            }

        } catch(error){
            console.log("Error in processing the queue - ",error.message);
        }
    }
  }
  
  export default manager;