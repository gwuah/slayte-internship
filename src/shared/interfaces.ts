export enum OnboardingStatuses {
  started = "onboarding_started",
  basicDetailsProvided = "basic_details_provided",
  userGoalsProvided = "user_goals_provided",
  adminEmailsProvided = "admin_emails_provided",
}

export type handleChangeResponse = (
  e: React.ChangeEvent<HTMLInputElement>,
) => void;

export interface BasicDetailsErrors {
  firstNameHasError: boolean;
  lastNameHasError: boolean;
  emailHasError: boolean;
}

export interface UserGoalsErrors {
  firstGoalHasError: boolean;
  secondGoalHasError: boolean;
  thirdGoalHasError: boolean;
}
