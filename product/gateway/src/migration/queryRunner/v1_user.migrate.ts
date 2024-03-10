import { QueryRunner } from 'typeorm';
import { AbstractHanaMigrate } from './abstractHana.migrate';

export class V1CreateUser extends AbstractHanaMigrate {
    constructor(tenantId: string, queryRunner: QueryRunner) {
        super(tenantId, queryRunner, '1', 'user');
    }

    protected getSql(): string[] {
        return `
        CREATE TABLE IF NOT EXISTS "${this.tenantId}"."${this.tableName}"
            (
                user_id           UUID                     NOT NULL,
                organization_id   UUID                     NOT NULL,
                created_at        TIMESTAMP with time zone NOT NULL,
                created_by        VARCHAR                  NOT NULL,
                updated_at        TIMESTAMP with time zone,
                updated_by        VARCHAR,
                family_name       VARCHAR                  NOT NULL,
                given_name        VARCHAR                  NOT NULL,
                login_id          VARCHAR                  NOT NULL,
                email             VARCHAR,
                password          VARCHAR,
                password_enter_at TIMESTAMP with time zone,
                country           VARCHAR,
                team              VARCHAR,
                position          VARCHAR,
                agreements        JSONB                    NOT NULL,
                mfa               JSONB,
                last_login_at     TIMESTAMP with time zone,
                last_login_ip     VARCHAR,
                last_login_type   VARCHAR,
                login_types       JSONB                    NOT NULL,
                lock_at           TIMESTAMP with time zone,
                is_activated      BOOLEAN                  NOT NULL,
                deleted_at        TIMESTAMP with time zone,
                active_role_id    UUID,
                CONSTRAINT user_pk PRIMARY KEY (user_id)
            );

            CREATE UNIQUE INDEX user_email_uk ON "user" USING btree (email);
            CREATE UNIQUE INDEX user_login_id_uk ON "user" USING btree (login_id);

            COMMENT ON TABLE "user" IS '사용자';
            COMMENT ON COLUMN "user".user_id IS 'ID';
            COMMENT ON COLUMN "user".organization_id IS '조직 ID';
            COMMENT ON COLUMN "user".created_at IS '등록일시';
            COMMENT ON COLUMN "user".created_by IS '등록자';
            COMMENT ON COLUMN "user".updated_at IS '수정일시';
            COMMENT ON COLUMN "user".updated_by IS '수정자';
            COMMENT ON COLUMN "user".organization_id IS '조직 ID';
            COMMENT ON COLUMN "user".family_name IS '성';
            COMMENT ON COLUMN "user".given_name IS '이름';
            COMMENT ON COLUMN "user".login_id IS '로그인 ID';
            COMMENT ON COLUMN "user".email IS '이메일';
            COMMENT ON COLUMN "user".password IS '비밀번호';
            COMMENT ON COLUMN "user".password_enter_at IS '비밀번호 입력 일시';
            COMMENT ON COLUMN "user".country IS '국가';
            COMMENT ON COLUMN "user".team IS '팀';
            COMMENT ON COLUMN "user".position IS '직군';
            COMMENT ON COLUMN "user".agreements IS '이용약관';
            COMMENT ON COLUMN "user".mfa IS 'MFA';
            COMMENT ON COLUMN "user".last_login_at IS '마지막 로그인 일시';
            COMMENT ON COLUMN "user".last_login_ip IS '마지막 로그인 IP';
            COMMENT ON COLUMN "user".login_types IS '로그인 유형';
            COMMENT ON COLUMN "user".lock_at IS '계정 잠금 일시';
            COMMENT ON COLUMN "user".is_activated IS '계정 활성화 여부';
            COMMENT ON COLUMN "user".deleted_at IS '계정 삭제 일시';
        `.split(';');
    }
}
