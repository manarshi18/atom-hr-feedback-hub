
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import StarRating from './StarRating';
import { useToast } from '@/hooks/use-toast';

interface FeedbackQuestion {
  id: number;
  question: string;
  rating: number;
}

const FeedbackForm = () => {
  const { toast } = useToast();
  const [additionalFeedback, setAdditionalFeedback] = useState('');
  const [questions, setQuestions] = useState<FeedbackQuestion[]>([
    { id: 1, question: "How would you rate your overall work experience this week?", rating: 0 },
    { id: 2, question: "How satisfied are you with the tools and resources provided to you?", rating: 0 },
    { id: 3, question: "How well do you feel your team collaboration has been?", rating: 0 },
    { id: 4, question: "How would you rate your work-life balance in the current period?", rating: 0 },
    { id: 5, question: "How satisfied are you with the feedback from your team leader?", rating: 0 },
  ]);

  const handleRatingChange = (questionId: number, rating: number) => {
    setQuestions(
      questions.map((q) => (q.id === questionId ? { ...q, rating } : q))
    );
  };

  const handleSubmit = () => {
    // Check if all questions have been rated
    const allQuestionsRated = questions.every((q) => q.rating > 0);
    
    if (!allQuestionsRated) {
      toast({
        title: "Incomplete Feedback",
        description: "Please rate all questions before submitting.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, you would submit this data to your backend
    console.log("Feedback submitted:", { questions, additionalFeedback });
    
    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback!",
    });

    // Reset the form
    setQuestions(questions.map(q => ({ ...q, rating: 0 })));
    setAdditionalFeedback('');
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Employee Feedback</CardTitle>
        <CardDescription>
          Please rate your experience and provide additional feedback if needed
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {questions.map((q) => (
          <div key={q.id} className="space-y-2">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <p className="text-sm font-medium flex-1">{q.question}</p>
              <div className="flex justify-end">
                <StarRating
                  initialRating={q.rating}
                  onChange={(rating) => handleRatingChange(q.id, rating)}
                />
              </div>
            </div>
            <div className="h-px bg-gray-200 dark:bg-gray-700 my-4" />
          </div>
        ))}
        
        <div className="space-y-2 pt-4">
          <label htmlFor="additional-feedback" className="text-sm font-medium">
            Additional Comments (Optional)
          </label>
          <Textarea
            id="additional-feedback"
            placeholder="Share any additional thoughts or suggestions..."
            value={additionalFeedback}
            onChange={(e) => setAdditionalFeedback(e.target.value)}
            className="min-h-[120px]"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button 
          onClick={handleSubmit} 
          className="bg-[hsl(var(--brand-blue))] hover:bg-[hsl(var(--brand-blue-light))]"
        >
          Submit Feedback
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FeedbackForm;
