
import { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import StarRating from "@/components/StarRating";
import { toast } from "sonner";

const FeedbackForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ratings, setRatings] = useState({
    workSatisfaction: 0,
    teamCollaboration: 0,
    workLifeBalance: 0,
    growthOpportunities: 0,
    managementSupport: 0
  });
  const [comment, setComment] = useState('');

  const handleRatingChange = (question: keyof typeof ratings, rating: number) => {
    setRatings((prev) => ({
      ...prev,
      [question]: rating
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const totalRatings = Object.values(ratings).reduce((sum, rating) => sum + rating, 0);
    const questionsAnswered = Object.values(ratings).filter(rating => rating > 0).length;
    
    if (questionsAnswered < 3) {
      toast.error("Please rate at least 3 categories before submitting.");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Thank you for your feedback!");
      
      // Reset form
      setRatings({
        workSatisfaction: 0,
        teamCollaboration: 0,
        workLifeBalance: 0,
        growthOpportunities: 0,
        managementSupport: 0
      });
      setComment('');
    }, 1500);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-6 dark:text-white">Employee Feedback Form</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div className="feedback-question">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              How satisfied are you with your work environment?
            </label>
            <StarRating 
              onChange={(rating) => handleRatingChange('workSatisfaction', rating)} 
              initialRating={ratings.workSatisfaction}
            />
          </div>
          
          <div className="feedback-question">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Rate your team collaboration experience
            </label>
            <StarRating 
              onChange={(rating) => handleRatingChange('teamCollaboration', rating)}
              initialRating={ratings.teamCollaboration}
            />
          </div>
          
          <div className="feedback-question">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              How would you rate your work-life balance?
            </label>
            <StarRating 
              onChange={(rating) => handleRatingChange('workLifeBalance', rating)}
              initialRating={ratings.workLifeBalance} 
            />
          </div>
          
          <div className="feedback-question">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Rate the growth opportunities provided by the company
            </label>
            <StarRating 
              onChange={(rating) => handleRatingChange('growthOpportunities', rating)}
              initialRating={ratings.growthOpportunities}
            />
          </div>
          
          <div className="feedback-question">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              How well does management support your needs?
            </label>
            <StarRating 
              onChange={(rating) => handleRatingChange('managementSupport', rating)}
              initialRating={ratings.managementSupport}
            />
          </div>
          
          <div className="mt-6">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Additional Comments (Optional)
            </label>
            <Textarea
              placeholder="Share your thoughts or suggestions..."
              className="min-h-[120px]"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          
          <div className="mt-8">
            <button
              type="submit"
              className={`w-full px-6 py-3 text-white font-medium rounded-md bg-blue-600 hover:bg-blue-700 transition-colors 
                ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;
